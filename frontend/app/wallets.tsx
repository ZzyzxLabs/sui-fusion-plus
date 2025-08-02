'use client';

import { createConfig, http, WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WalletProvider, ConnectButton } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';

const queryClient = new QueryClient();

const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

export function WalletProviders({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <WalletProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WalletProvider>
    </WagmiProvider>
  );
}