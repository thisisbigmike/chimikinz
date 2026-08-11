import { createPublicClient, http, formatEther, isAddress } from 'viem'
import { mainnet, sepolia } from 'viem/chains'

// Official Ethereum Contract Configuration
export const CHIMIKINZ_CONTRACT_ADDRESS =
  (process.env.NEXT_PUBLIC_CHIMIKINZ_CONTRACT_ADDRESS as `0x${string}`) ||
  '0x0000000000000000000000000000000000000000'

export const TARGET_CHAIN = process.env.NEXT_PUBLIC_NETWORK === 'sepolia' ? sepolia : mainnet

// Initialize Viem Public Client for real Ethereum blockchain reads
export const publicClient = createPublicClient({
  chain: TARGET_CHAIN,
  transport: http(process.env.NEXT_PUBLIC_ETH_RPC_URL || 'https://cloudflare-eth.com'),
})

// ERC-721 Standard Smart Contract ABI
export const ERC721_ABI = [
  {
    name: 'name',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'string' }],
  },
  {
    name: 'symbol',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'string' }],
  },
  {
    name: 'totalSupply',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ type: 'uint256' }],
  },
  {
    name: 'ownerOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [{ type: 'address' }],
  },
] as const

/**
 * Fetches real ETH balance for any address on Ethereum Mainnet
 */
export async function getRealEthBalance(address: string): Promise<string> {
  if (!isAddress(address)) return '0.00'
  try {
    const balanceWei = await publicClient.getBalance({
      address: address as `0x${string}`,
    })
    return Number(formatEther(balanceWei)).toFixed(4)
  } catch (error) {
    console.warn('Real ETH balance query note:', error)
    return '0.00'
  }
}

/**
 * Reads real NFT token balance from Ethereum smart contract
 */
export async function getRealNFTBalance(userAddress: string): Promise<number> {
  if (!isAddress(userAddress) || CHIMIKINZ_CONTRACT_ADDRESS === '0x0000000000000000000000000000000000000000') {
    return 0
  }

  try {
    const count = await publicClient.readContract({
      address: CHIMIKINZ_CONTRACT_ADDRESS,
      abi: ERC721_ABI,
      functionName: 'balanceOf',
      args: [userAddress as `0x${string}`],
    })
    return Number(count)
  } catch (error) {
    console.warn('Smart contract balanceOf read note:', error)
    return 0
  }
}

/**
 * Reads real total minted supply from Ethereum smart contract
 */
export async function getRealTotalMinted(): Promise<number> {
  if (CHIMIKINZ_CONTRACT_ADDRESS === '0x0000000000000000000000000000000000000000') {
    return 0
  }

  try {
    const total = await publicClient.readContract({
      address: CHIMIKINZ_CONTRACT_ADDRESS,
      abi: ERC721_ABI,
      functionName: 'totalSupply',
    })
    return Number(total)
  } catch (error) {
    console.warn('Smart contract totalSupply read note:', error)
    return 0
  }
}
