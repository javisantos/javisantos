import Vcard from './vcard'
const myVcard = new Vcard({
  Name: 'Javi Santos',
  Website: 'https://javisantos.com',
  Email: 'mail@javisantos.com',
  Gravatar: '5d0c047208bc6f0f763b633874604620',
  publicKey: {
    alg: 'EdDSA',
    crv: 'ed448',
    PublicKeyGoldilocks: 'BCBVtwNwECotauHbJLFT8gh0odl7Zuz5WHvPuYQv15V6_vNKpzBrSXDWrmyMkOBbcZo9g-EtL3bm62f9j8z5QPFK4RsaUq-XySwba-QuNmvZxt4v2p-IxxWbAtNqOZ7F65yqww9EMpEGISGaPQ-e7bc'
  }
})
myVcard.print()
// myVcard.terminal()
myVcard.ask()
