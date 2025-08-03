// Copyright (c), Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { getFullnodeUrl } from '@mysten/sui/client';
import { createNetworkConfig } from '@mysten/dapp-kit';

const { networkConfig, useNetworkVariable, useNetworkVariables } = createNetworkConfig({
  testnet: {
    url: getFullnodeUrl('testnet'),
    variables: {
      packageId: '0x2::sui::SUI', // Replace with the actual package ID
      gqlClient: 'https://sui-testnet.mystenlabs.com/graphql',
    },
  },
});

export { useNetworkVariable, useNetworkVariables, networkConfig };