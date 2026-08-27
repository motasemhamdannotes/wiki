

[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)

## 1. Mental Model: What Blockchain Actually Is

A blockchain is a **shared, append-only ledger** maintained by many nodes instead of one central authority.

| Concept | Practical Meaning |
|---|---|
| Block | A container for verified transactions. |
| Chain | Blocks linked by cryptographic hashes. |
| Hash | A fixed-length fingerprint of data. A tiny input change creates a completely different hash. |
| Node | A computer running blockchain software and maintaining/verifying the ledger. |
| Consensus | The process by which nodes agree on the valid chain/state. |
| Immutability | Past records are hard to alter because each block links to the previous one and copies exist across many nodes. |
| Smart Contract | Code deployed on-chain that executes deterministic logic. |
| dApp | A user-facing app that talks to smart contracts through wallets/APIs. |

### Block Structure

A block normally contains:

```text
Block Header
├── Previous block hash
├── Merkle root / transaction root
├── Timestamp
├── Difficulty / consensus metadata
├── Nonce or validator metadata
└── Other chain-specific fields

Block Body
└── Transactions
```

### Transaction Lifecycle

```text
User creates transaction
        ↓
Wallet signs transaction with private key
        ↓
Transaction is broadcast to peer-to-peer network
        ↓
Nodes validate signature, nonce, balances, and rules
        ↓
Transaction enters mempool
        ↓
Block producer selects transactions
        ↓
Network validates new block
        ↓
Transaction becomes part of blockchain history
```

---

## 2. Coins, Tokens, dApps, DeFi, DEXs, and DAOs

| Term | Meaning |
|---|---|
| Coin | Native asset of its own blockchain, such as BTC or ETH. |
| Token | Asset deployed on top of another blockchain, such as ERC-20 tokens on Ethereum. |
| Utility Token | Grants access to a product, protocol, or service. |
| Security Token | Represents ownership, equity, or regulated asset exposure. |
| dApp | Application where backend logic runs through smart contracts. |
| DeFi | Financial services built with smart contracts: lending, borrowing, trading, staking, yield. |
| DEX | Decentralized exchange where trades execute via smart contracts, not centralized order books. |
| DAO | On-chain governance organization using token voting and smart contract rules. |

### Security Reality

Blockchain removes some intermediaries, but it does **not** remove risk. It shifts risk into:

- smart contract bugs
- key management failures
- wallet phishing
- bridge architecture
- oracle design
- governance control
- frontend compromise
- protocol economics
- transaction ordering / MEV

---

## 3. Public vs Private vs Consortium Blockchains

| Type | Who Can Join | Strength | Weakness | Examples |
|---|---|---|---|---|
| Public | Anyone | Censorship resistance, openness | Slower, public data, higher fees | Bitcoin, Ethereum |
| Private | Approved participants | Speed, privacy, control | Centralization risk | Internal enterprise chains |
| Consortium | Group-controlled | Shared governance among organizations | Collusion and governance complexity | Hyperledger-style deployments |

---

## 4. Consensus Mechanisms Cheat Sheet

| Mechanism | How It Works | Security Risk |
|---|---|---|
| Proof of Work | Miners spend compute power to solve hash puzzles. | 51% attacks, selfish mining, energy cost. |
| Proof of Stake | Validators lock tokens as stake and are selected to propose/validate blocks. | stake concentration, long-range attacks, validator collusion. |
| BFT-style Consensus | Known validators vote on state. | validator compromise, membership/governance attacks. |
| PoET / Enterprise Consensus | Uses trusted execution or controlled membership. | trust assumptions shift to infrastructure and identity systems. |

### Finality

| Finality Type | Meaning |
|---|---|
| Probabilistic | Confidence increases as more blocks are added. Common in PoW. |
| Immediate / Deterministic | Once finalized, reversal is extremely unlikely without protocol violation. Common in BFT-style systems. |

---

## 5. Cryptography Essentials for Blockchain

### Hash Functions

A cryptographic hash function turns any input into a fixed-length digest.

Security properties:

- **Deterministic:** same input → same output.
- **One-way:** hash cannot practically be reversed.
- **Avalanche effect:** tiny input change → huge output change.
- **Preimage resistance:** hard to find an input that matches a given hash.
- **Collision resistance:** hard to find two different inputs with the same hash.

Common algorithms:

| Chain / Use | Hash |
|---|---|
| Bitcoin | SHA-256 |
| Ethereum | Keccak-256 |
| Legacy / unsafe for blockchain integrity | MD5, SHA-1 |

### Digital Signatures

```text
Private key signs transaction
Public key verifies signature
Address is derived from public key
```

Never expose the private key or seed phrase. Whoever controls the private key controls the funds.

### Symmetric vs Asymmetric Cryptography

| Type | Key Model | Use |
|---|---|---|
| Symmetric | Same key encrypts/decrypts | Fast encryption of bulk data. |
| Asymmetric | Public/private key pair | Wallets, signatures, ownership, identity. |

### Quantum Threat Summary

| Area | Quantum Risk | Defensive Direction |
|---|---|---|
| Public key crypto | Shor’s algorithm threatens RSA/ECDSA-style assumptions. | Post-quantum cryptography migration. |
| Hash functions | Grover’s algorithm weakens brute-force resistance. | Longer hash outputs. |

---
