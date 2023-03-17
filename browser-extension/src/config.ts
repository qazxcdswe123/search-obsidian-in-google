import Browser from 'webextension-polyfill';
import { defaults } from 'lodash-es';

export const defaultConfig = {
  port: 27080,
  token: '',
  vaultName: '',
};

export type UserConfig = typeof defaultConfig;

export async function getUserConfig(): Promise<UserConfig> {
  const config = await Browser.storage.local.get(Object.keys(defaultConfig));
  return defaults(config, defaultConfig);
}

export async function setUserConfig(updates: Partial<UserConfig>) {
  console.debug('setUserConfig', updates);
  if (updates.port && (updates.port < 1 || updates.port > 65535)) {
    throw new Error('Invalid port number (1-65535)');
  }
  return Browser.storage.local.set(updates);
}
