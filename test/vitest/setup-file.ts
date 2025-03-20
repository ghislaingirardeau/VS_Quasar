// test/vitest/setup-file.ts
import { config } from '@vue/test-utils';
import { Quasar } from 'quasar';
import * as components from 'quasar';

// Configuration globale pour @vue/test-utils
config.global.plugins = [Quasar];
config.global.components = components;
