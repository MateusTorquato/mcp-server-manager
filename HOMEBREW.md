# Publishing to Homebrew

There are two ways to publish your package to Homebrew:

## Option 1: Homebrew Core (Recommended for stable packages)

This requires your package to be:

- Stable and widely used
- Open source
- Have at least 20 stars on GitHub
- Have a stable release (not just pre-releases)

### Steps:

1. **Create a Homebrew formula file** (`Formula/m/mcp-server-manager.rb`):

```ruby
class McpServerManager < Formula
  desc "The all-in-one CLI tool to manage your MCP servers across all clients"
  homepage "https://github.com/MateusTorquato/mcp-server-manager"
  url "https://registry.npmjs.org/mcp-server-manager/-/mcp-server-manager-2.0.0.tgz"
  sha256 "<SHA256_HASH>"
  license "MIT"

  depends_on "node"

  def install
    system "npm", "install", *Language::Node.std_npm_install_args(libexec)
    bin.install_symlink Dir["#{libexec}/bin/*"]
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/mcpsm --version")
  end
end
```

2. **Get the SHA256 hash**:

```bash
curl -L https://registry.npmjs.org/mcp-server-manager/-/mcp-server-manager-2.0.0.tgz | shasum -a 256
```

3. **Fork the Homebrew core repository**:
   - Go to https://github.com/Homebrew/homebrew-core
   - Click "Fork"

4. **Create a branch and add your formula**:

```bash
git clone https://github.com/YOUR_USERNAME/homebrew-core.git
cd homebrew-core
git checkout -b add-mcp-server-manager
# Add your formula file
git add Formula/m/mcp-server-manager.rb
git commit -m "mcp-server-manager 2.0.0"
git push origin add-mcp-server-manager
```

5. **Open a Pull Request**:
   - Go to https://github.com/Homebrew/homebrew-core
   - Click "New Pull Request"
   - Select your branch
   - Follow the PR template

## Option 2: Homebrew Tap (Easier, recommended for now)

A tap is your own Homebrew repository. This is easier and faster.

### Steps:

1. **Create a new repository** named `homebrew-mcp-server-manager` (or similar):

   ```bash
   # On GitHub, create a new repository named "homebrew-mcp-server-manager"
   ```

2. **Create the formula file** in your tap:

```bash
mkdir -p homebrew-mcp-server-manager
cd homebrew-mcp-server-manager
```

Create `Formula/mcp-server-manager.rb`:

```ruby
class McpServerManager < Formula
  desc "The all-in-one CLI tool to manage your MCP servers across all clients"
  homepage "https://github.com/MateusTorquato/mcp-server-manager"
  url "https://registry.npmjs.org/mcp-server-manager/-/mcp-server-manager-2.0.0.tgz"
  sha256 "<SHA256_HASH>"
  license "MIT"

  depends_on "node"

  def install
    system "npm", "install", *Language::Node.std_npm_install_args(libexec)
    bin.install_symlink Dir["#{libexec}/bin/*"]
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/mcpsm --version")
  end
end
```

3. **Get the SHA256 hash**:

```bash
curl -L https://registry.npmjs.org/mcp-server-manager/-/mcp-server-manager-2.0.0.tgz | shasum -a 256
```

4. **Commit and push**:

```bash
git init
git add Formula/mcp-server-manager.rb
git commit -m "Add mcp-server-manager formula"
git remote add origin https://github.com/MateusTorquato/homebrew-mcp-server-manager.git
git push -u origin main
```

5. **Update README** to use the tap:

```bash
brew tap MateusTorquato/mcp-server-manager
brew install mcp-server-manager
```

Or in one line:

```bash
brew install MateusTorquato/mcp-server-manager/mcp-server-manager
```

## Updating the Formula

When you release a new version:

1. Update the `url` and `sha256` in the formula
2. Update the version number
3. Commit and push

For taps, this is immediate. For core, you'll need to open a new PR.

## Recommended Approach

Start with **Option 2 (Tap)** - it's faster and you have full control. You can always move to core later if the package gains traction.
