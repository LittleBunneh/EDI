# Deploy Promethean Conduit to PythonAnywhere

## Step 1: Build Your React App Locally
```bash
npm run build
```
This creates a `dist/` folder with optimized static files.

## Step 2: Upload Files to PythonAnywhere

### Option A: Via Web Interface
1. Log into PythonAnywhere
2. Go to **Files** tab
3. Navigate to `/home/yourusername/`
4. Create folder: `promethean-conduit`
5. Go into that folder
6. Click **Upload a file** and upload ALL files from your local `dist/` folder
   - index.html
   - assets/ folder (all JS/CSS files)
   - Any other files in dist/

### Option B: Via Git (Recommended)
1. Push your code to GitHub
2. In PythonAnywhere, open a **Bash console**
3. Run:
```bash
cd ~
git clone https://github.com/yourusername/your-repo.git promethean-conduit
cd promethean-conduit
npm install
npm run build
```

## Step 3: Configure Web App on PythonAnywhere

1. Go to **Web** tab
2. Click **Add a new web app**
3. Choose **Manual configuration**
4. Select **Python 3.10** (version doesn't matter for static sites)
5. Click through to create the app

## Step 4: Set Up Static Files

1. In the **Web** tab, scroll to **Static files** section
2. **Delete** the default `/static/` mapping
3. Add new mapping:
   - **URL:** `/`
   - **Directory:** `/home/yourusername/promethean-conduit/dist`
4. Add another mapping for assets:
   - **URL:** `/assets`
   - **Directory:** `/home/yourusername/promethean-conduit/dist/assets`

## Step 5: Configure Custom Domain

1. In **Web** tab, find **Configuration for prometheanconduit.ai** section
2. Your domain should already be listed (since you linked it from Namecheap)
3. Make sure both domains point to same app:
   - prometheanconduit.ai
   - www.prometheanconduit.ai

## Step 6: Update WSGI File (Important!)

1. In **Web** tab, click on **WSGI configuration file** link
2. Replace ALL content with:
```python
# Serve React static files
def application(environ, start_response):
    status = '200 OK'
    response_headers = [('Content-type', 'text/html')]
    start_response(status, response_headers)
    
    with open('/home/yourusername/promethean-conduit/dist/index.html', 'rb') as f:
        return [f.read()]
```
3. Replace `yourusername` with your actual PythonAnywhere username
4. Save the file
## Step 7: Enable HTTPS/SSL Certificate

### For Paid PythonAnywhere Accounts:
1. In **Web** tab, scroll to **Security** section
2. Find **HTTPS/SSL certificate** area
3. Click **Enable HTTPS** for prometheanconduit.ai
4. PythonAnywhere will automatically provision a Let's Encrypt certificate
5. Repeat for www.prometheanconduit.ai if needed
6. Certificate auto-renews every 90 days

### Force HTTPS Redirect:
1. Click on **WSGI configuration file** link in Web tab
2. Update the code to redirect HTTP to HTTPS:
```python
# Serve React static files with HTTPS redirect
def application(environ, start_response):
    # Force HTTPS redirect
    if environ.get('HTTP_X_FORWARDED_PROTO') != 'https':
        status = '301 Moved Permanently'
        response_headers = [('Location', 'https://' + environ['HTTP_HOST'] + environ['PATH_INFO'])]
        start_response(status, response_headers)
        return [b'']
    
    status = '200 OK'
    response_headers = [('Content-type', 'text/html')]
    start_response(status, response_headers)
    
    with open('/home/yourusername/promethean-conduit/dist/index.html', 'rb') as f:
        return [f.read()]
```
3. Replace `yourusername` with your actual PythonAnywhere username
4. Save and **Reload** the web app

### For Free PythonAnywhere Accounts:
- Free accounts don't support custom domains with HTTPS
- You'll need to upgrade to a paid plan ($5/month minimum)
- Go to **Account** tab → **Upgrade** to enable SSL for custom domains

### Verify HTTPS is Working:
1. Visit https://prometheanconduit.ai
2. Check for padlock icon in browser address bar
3. Try visiting http://prometheanconduit.ai - should redirect to HTTPS
4. Test certificate: https://www.ssllabs.com/ssltest/analyze.html?d=prometheanconduit.ai

## Step 8: Reload & Test

1. Click big green **Reload** button at top of Web tab
2. Visit https://prometheanconduit.ai
3. Test all features:
   - Consciousness chat
   - Timeline graph
   - Data export
   - Navigation

## Troubleshooting

**404 Errors?**
- Check static file paths are correct
- Ensure dist/ folder uploaded completely

**Blank Page?**
- Check browser console for errors
- Verify Supabase URL in .env is correct

**Domain Not Working?**
- Verify DNS settings in Namecheap point to PythonAnywhere
- Wait 24-48 hours for DNS propagation

**Assets Not Loading?**
- Add explicit /assets mapping in Static files section
- Check file permissions (should be readable)

## Update Your App Later

When you make changes:
```bash
npm run build
```
Upload new dist/ files to PythonAnywhere, then click **Reload**
