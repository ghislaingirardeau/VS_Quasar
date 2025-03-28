import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import BarcodeDetection from './BarcodeDetection.vue';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';

installQuasarPlugin();

const form = {
  id: 0,
  shop: {
    id: null,
    label: '',
  },
  barcode: {
    code: '',
    format: 'CODE128',
  },
  isShoppingCard: false,
  isCardCode: false,
  password: '',
  color: null,
};

describe('BarcodeDetection.vue', () => {
  // Mock entire mediaDevices object before tests
  beforeEach(() => {
    // Ensure mediaDevices exists
    if (!global.navigator.mediaDevices) {
      (global.navigator as any).mediaDevices = {} as MediaDevices;
    }

    // Mock getUserMedia method
    global.navigator.mediaDevices.getUserMedia = vi.fn(() =>
      Promise.resolve({
        getTracks: () => [
          {
            stop: vi.fn(),
          },
        ],
        active: true,
        id: 'mock-stream-id',
        onaddtrack: null,
        onremovetrack: null,
        addTrack: vi.fn(),
        removeTrack: vi.fn(),
        getAudioTracks: vi.fn(),
        getVideoTracks: vi.fn(),
        getTrackById: vi.fn(),
        clone: vi.fn(),
      } as unknown as MediaStream),
    );
  });

  // Mock BarcodeDetector
  class MockBarcodeDetector {
    async detect() {
      return [{ rawValue: '123456789', format: 'code_128' }];
    }
  }

  beforeEach(() => {
    // Mock BarcodeDetector on global window object
    (global.window as any).BarcodeDetector = MockBarcodeDetector as any;
  });

  it('should start the camera on mount', async () => {
    mount(BarcodeDetection, {
      props: {
        form,
      },
    });
    await nextTick();

    expect(global.navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({
      video: { facingMode: 'environment' },
      audio: false,
    });
  });

  it('should not display video element anymore when a barcode is dected', async () => {
    const wrapper = mount(BarcodeDetection, {
      props: {
        form,
      },
      attachTo: document.body,
    });
    await nextTick();

    expect(wrapper.find('video').exists()).toBe(true);
    (wrapper.vm as any).barcodeDetected = {
      code: '123456789123',
      format: 'code128',
    };
    (wrapper.vm as any).codeBarMessage = 'Barcode detected';

    await nextTick();
    expect(wrapper.find('video').isVisible()).toBe(false);
  });

  it('should emit an error if BarcodeDetector is not supported', async () => {
    // Remove BarcodeDetector from global window object
    (global.window as any).BarcodeDetector = undefined;

    const wrapper = mount(BarcodeDetection, {
      props: {
        form,
      },
    });

    await nextTick();

    const imageElement = document.createElement('img');
    await (wrapper.vm as any).detectBarcode(imageElement);

    // Check if the error event was emitted
    expect(wrapper.emitted('detection-error')).toBeTruthy();
    expect(wrapper.emitted()).toHaveProperty('detection-error');
  });
});
