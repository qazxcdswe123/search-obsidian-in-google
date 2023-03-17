import React, { useCallback, useEffect, useState } from 'react';
import { getUserConfig, setUserConfig } from '../../config';


function PopupPage() {
  const [port, setPort] = useState<number>(27080);
  const [token, setToken] = useState<string>('');
  const [vaultName, setVaultName] = useState<string>('');

  useEffect(() => {
    getUserConfig().then((config) => {
      setPort(config.port);
      setToken(config.token);
      setVaultName(config.vaultName);
    });
  }, []);

  const onTokenChange = useCallback(
    (token: string) => {
      setToken(token);
      setUserConfig({ token });
    },
    [setToken]
  );

  const onPortChange = useCallback(
    (port: number) => {
      setPort(port);
      setUserConfig({ port });
    },
    [setPort]
  );

  const onVaultNameChange = useCallback(
    (vaultName: string) => {
      setVaultName(vaultName);
      setUserConfig({ vaultName });
    },
    [setVaultName]
  );

  return (
    <div className="App">
      <label htmlFor="port">Local Port: </label>
      <input
        type="number"
        value={port}
        id="port"
        onChange={(e) => onPortChange(Number(e.target.value))}
      />
      <label htmlFor="token">Token: </label>
      <input
        type="text"
        value={token}
        id="token"
        onChange={(e) => onTokenChange(e.target.value)}
      />
      <label htmlFor="vaultName">Vault Name: </label>
      <input
        type="text"
        value={vaultName}
        id="vaultName"
        onChange={(e) => onVaultNameChange(e.target.value)}
      />
    </div>
  );
}

export default PopupPage;
