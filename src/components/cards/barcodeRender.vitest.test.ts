import { mount } from '@vue/test-utils';

import { describe, it, expect, vi } from 'vitest';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import barcodeRender from './barcodeRender.vue';
import JsBarcode from 'jsbarcode';

vi.mock('jsbarcode', () => {
  return {
    default: vi.fn(), // Utilisation de vi.fn() pour mocker la fonction par défaut
  };
});

installQuasarPlugin();

describe('Barcode render', () => {
  it('renders barcode inside svg', async () => {
    const wrapper = mount(barcodeRender, {
      props: {
        barcodeValue: {
          code: '123456789',
          format: 'CODE128',
        },
        barcodeWidth: 2,
      },
    });
    await wrapper.vm.$nextTick();

    expect(JsBarcode).toHaveBeenCalledWith(
      wrapper.vm.$refs.barcode,
      '123456789',
      expect.objectContaining({
        format: 'CODE128',
        width: 2,
        height: 80,
        displayValue: true,
      }),
    );
  });
  it('updates the barcode when props change', async () => {
    const wrapper = mount(barcodeRender, {
      props: {
        barcodeValue: { code: '123456789', format: 'CODE128' },
        barcodeWidth: 2,
      },
    });

    await wrapper.setProps({
      barcodeValue: { code: '987654321', format: 'CODE39' },
    });
    await wrapper.vm.$nextTick();

    expect(JsBarcode).toHaveBeenCalledWith(
      wrapper.vm.$refs.barcode,
      '987654321',
      expect.objectContaining({
        format: 'CODE39',
        width: 2,
        height: 80,
        displayValue: true,
      }),
    );
  });
});
