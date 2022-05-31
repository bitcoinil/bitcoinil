export const ButtonTest = () => {
  return (
  <>
    <span>Keks</span>
    <ol>
      <li>Block</li>
    </ol>
    <pre>{struct}</pre>
  </>
)
}
const struct = `
Package:
  Config (package.json['djitsu'] ~~> FS_ROOT/config):
    - ENV Variables
    - Keys/Secrets
  Dependencies (List):
    - Djitsu packages
      - Local
      - IPFS
      - NPM
      - Github
    - Github Repos
    - Package managers
      - NPM
      - Python
      - etc'
  - Assets (FS)
    - Images
    - Videos
    - Audio
    - Fonts
    - Text
  - Blocks (Tree)
    - Asset
      - Code
      - Image
      - Video
    - Text
    - Collection of Blocks (Child Blocks)
      - Collection Configuration
      - List of Blocks


`
