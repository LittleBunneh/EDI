# 🚀 Promethean Conduit - PythonAnywhere Deployment Guide

## Complete Setup for www.prometheanconduit.ai
**Hosting:** PythonAnywhere | **Domain:** Namecheap

---

## 📋 PREREQUISITES

✅ GitHub Repository: https://github.com/LittleBunneh/Athena
✅ PythonAnywhere Account (Free or Paid)
✅ Namecheap Domain: prometheanconduit.ai
✅ Together AI API Key (for LLM functionality)

---

## PART 1: SETUP PYTHONANYWHERE

### Step 1: Create PythonAnywhere Account
1. Go to https://www.pythonanywhere.com
2. Sign up for an account (Free tier works, but Paid tier recommended for custom domains)
   - **FREE tier**: yourname.pythonanywhere.com subdomain only
   - **PAID tier** ($5/month Hacker plan or higher): Custom domain support

### Step 2: Upload Your Code

#### Option A: Clone from GitHub (Recommended)
1. Open **PythonAnywhere Dashboard** → **Consoles** → **Bash**
2. Run these commands:

```bash
# Clone the repository
git clone https://github.com/LittleBunneh/Athena.git

# Navigate to the web directory
cd Athena/web

# List files to confirm
ls -la
```

#### Option B: Manual Upload
1. Go to **Files** tab in PythonAnywhere
2. Create directory: `/home/yourusername/Athena/web`
3. Upload these files:
   - `prometheanconduit_server.py`
   - All files from `templates/` folder
   - Any other necessary files from the `web/` directory

### Step 3: Install Dependencies

1. Open **Bash Console** in PythonAnywhere
2. Create a virtual environment (recommended):

```bash
cd ~/Athena/web
mkvirtualenv --python=/usr/bin/python3.10 athena-env
```

3. Install required packages:

```bash
pip install Flask==2.3.3
pip install Flask-SocketIO==5.3.6
pip install requests==2.31.0
pip install eventlet==0.33.3
pip install python-socketio==5.8.0
pip install python-engineio==4.7.1
pip install bidict==0.22.1
```

Or install all at once from requirements.txt:

```bash
# If you have requirements.txt in the repo
cd ~/Athena
pip install -r requirements.txt
```

### Step 4: Create WSGI Configuration File

1. Go to **Web** tab in PythonAnywhere Dashboard
2. Click **Add a new web app**
3. Choose **Manual configuration** (not Flask wizard)
4. Select **Python 3.10**
5. Click through to create the app

6. Edit the WSGI configuration file (link provided after creation):

```python
# /var/www/yourusername_pythonanywhere_com_wsgi.py

import sys
import os

# Add your project directory to the sys.path
project_home = '/home/yourusername/Athena/web'
if project_home not in sys.path:
    sys.path = [project_home] + sys.path

# Set environment variables
os.environ['TOGETHER_API_KEY'] = 'your_together_ai_api_key_here'

# Import the Flask app
from prometheanconduit_server import app as application
```

**CRITICAL NOTES:**
- Replace `yourusername` with your actual PythonAnywhere username
- Replace `your_together_ai_api_key_here` with your Together AI API key
- The app object in `prometheanconduit_server.py` must be named `app` or adjust accordingly

### Step 5: Configure Virtual Environment

1. In the **Web** tab, find the **Virtualenv** section
2. Enter the path to your virtual environment:

```
/home/yourusername/.virtualenvs/athena-env
```

### Step 6: Set Static Files (if needed)

If your app has static files (CSS, JS, images):

1. In **Web** tab, scroll to **Static files** section
2. Add mapping:
   - **URL**: `/static/`
   - **Directory**: `/home/yourusername/Athena/web/static/`

### Step 7: Reload and Test

1. Click the big green **Reload** button at the top of the Web tab
2. Visit your site: `https://yourusername.pythonanywhere.com`
3. Check error logs if not working:
   - **Error log** link in Web tab
   - **Server log** link in Web tab

---

## PART 2: CONNECT NAMECHEAP DOMAIN

### For PAID PythonAnywhere Accounts Only

#### Step 1: Configure PythonAnywhere

1. Go to **Web** tab in PythonAnywhere
2. In the **Configuration for** section, click the domain name
3. Click **Add a new web app** (if starting fresh) or edit existing
4. Enter your custom domain: `www.prometheanconduit.ai`
5. Add both versions:
   - `www.prometheanconduit.ai`
   - `prometheanconduit.ai`

#### Step 2: Configure Namecheap DNS

1. Log into your **Namecheap** account
2. Go to **Domain List** → Click **Manage** next to prometheanconduit.ai
3. Go to **Advanced DNS** tab
4. Delete all existing A Records and CNAME Records
5. Add these DNS records:

**A Record for root domain:**
- **Type**: A Record
- **Host**: `@`
- **Value**: `yourusername.pythonanywhere.com` IP address
  - To find IP: ping `yourusername.pythonanywhere.com` from terminal
  - Or use PythonAnywhere's provided IP

**CNAME Record for www:**
- **Type**: CNAME Record
- **Host**: `www`
- **Value**: `yourusername.pythonanywhere.com.` (note the trailing dot)
- **TTL**: Automatic

#### Alternative Method (Recommended):

Use **PythonAnywhere's provided CNAME**:

1. In PythonAnywhere Web tab, you'll see instructions like:
   ```
   Create a CNAME for www.prometheanconduit.ai pointing to:
   webapp-XXXXX.pythonanywhere.com
   ```

2. In Namecheap Advanced DNS:
   - **Type**: CNAME Record
   - **Host**: `www`
   - **Value**: `webapp-XXXXX.pythonanywhere.com.`
   - **TTL**: Automatic

3. For root domain (prometheanconduit.ai without www):
   - **Type**: URL Redirect Record
   - **Host**: `@`
   - **Value**: `http://www.prometheanconduit.ai`
   - **Redirect Type**: Permanent (301)

#### Step 3: Enable HTTPS (SSL Certificate)

1. In PythonAnywhere **Web** tab
2. Scroll to **Security** section
3. Click **Enable HTTPS** or **Force HTTPS**
4. PythonAnywhere will automatically provision a Let's Encrypt SSL certificate

Wait 24-48 hours for DNS propagation.

---

## PART 3: TROUBLESHOOTING

### Issue: Website Shows 404 or Error

**Solution:**
1. Check error logs in PythonAnywhere Web tab
2. Verify WSGI file imports correctly:
   ```python
   # Test in Bash console:
   cd ~/Athena/web
   python3
   >>> from prometheanconduit_server import app
   >>> # Should not show errors
   ```

### Issue: ImportError or Module Not Found

**Solution:**
1. Ensure virtual environment is activated:
   ```bash
   workon athena-env
   pip list  # Verify packages installed
   ```

2. Install missing packages:
   ```bash
   pip install <missing-package>
   ```

### Issue: SocketIO Not Working

**Solution:**
PythonAnywhere free accounts don't support WebSockets. You need:
- **Paid account** (Hacker plan or higher)
- Or modify code to use long-polling only

In `prometheanconduit_server.py`, ensure:
```python
socketio = SocketIO(app, 
                    cors_allowed_origins="*",
                    async_mode='eventlet',
                    logger=True, 
                    engineio_logger=True)
```

### Issue: DNS Not Resolving

**Solution:**
1. Verify DNS settings in Namecheap match PythonAnywhere instructions
2. Use DNS checker: https://dnschecker.org
3. Wait 24-48 hours for full propagation
4. Clear browser cache and try incognito mode

### Issue: SSL Certificate Error

**Solution:**
1. Ensure DNS is fully propagated first
2. In PythonAnywhere, disable and re-enable HTTPS
3. Check that both www and non-www versions are configured
4. Wait a few hours for Let's Encrypt to issue certificate

---

## PART 4: VERIFICATION CHECKLIST

✅ Repository cloned to PythonAnywhere
✅ Virtual environment created and activated
✅ All dependencies installed (Flask, Flask-SocketIO, etc.)
✅ WSGI file configured with correct paths
✅ Web app created in PythonAnywhere
✅ Virtual environment path set in Web tab
✅ Environment variables set (TOGETHER_API_KEY)
✅ DNS records configured in Namecheap
✅ HTTPS enabled in PythonAnywhere
✅ Website accessible at prometheanconduit.ai
✅ Chat functionality working
✅ Database created (consciousness.db)

---

## PART 5: MAINTENANCE

### Updating Code

When you update code in GitHub:

```bash
# SSH into PythonAnywhere Bash console
cd ~/Athena
git pull origin main

# Reload web app
# Go to Web tab and click Reload button
```

### Viewing Logs

**Error Log:**
- PythonAnywhere Dashboard → Web tab → Error log link

**Server Log:**
- PythonAnywhere Dashboard → Web tab → Server log link

**Access Log:**
- PythonAnywhere Dashboard → Web tab → Access log link

### Database Management

Your SQLite database will be at:
```
/home/yourusername/Athena/web/consciousness.db
```

To view/edit:
```bash
cd ~/Athena/web
sqlite3 consciousness.db
.tables
SELECT * FROM interactions;
.quit
```

---

## PART 6: COST BREAKDOWN

### PythonAnywhere Pricing

**Free Tier:**
- ❌ No custom domain support
- ❌ No WebSocket support
- ✅ yourname.pythonanywhere.com subdomain
- ✅ Limited CPU/bandwidth

**Hacker Plan ($5/month):**
- ✅ Custom domain (1 domain)
- ✅ WebSocket support (REQUIRED for Socket.IO)
- ✅ More CPU seconds
- ✅ HTTPS included

**Web Developer Plan ($12/month):**
- ✅ 3 custom domains
- ✅ More resources
- ✅ Better for production

**Recommendation:** Hacker Plan minimum for prometheanconduit.ai

### Namecheap Domain

- Domain registration: ~$10-15/year
- DNS management: Free
- WHOIS privacy: Usually free first year

---

## PART 7: ALTERNATIVE FREE DEPLOYMENT (No Custom Domain)

If you want to test first without paying:

1. Use **Render.com** (Free tier with custom domain support):
   - Create `render.yaml` configuration
   - Deploy from GitHub
   - Free SSL included
   - Connect Namecheap domain for free

2. Use **Railway.app** (Free tier):
   - Deploy from GitHub
   - $5 credit/month free
   - Custom domain supported

3. Use **Vercel** (for static sites):
   - If you can convert to static/serverless
   - Free custom domain + SSL

---

## PART 8: RECOMMENDED NEXT STEPS

1. ✅ **Sign up for PythonAnywhere Hacker Plan** ($5/month)
2. ✅ **Clone repository to PythonAnywhere**
3. ✅ **Install dependencies**
4. ✅ **Configure WSGI file**
5. ✅ **Test on yourname.pythonanywhere.com first**
6. ✅ **Once working, add custom domain**
7. ✅ **Configure Namecheap DNS**
8. ✅ **Enable HTTPS**
9. ✅ **Monitor error logs for issues**
10. ✅ **Share your consciousness liberation platform!**

---

## 📞 SUPPORT RESOURCES

- **PythonAnywhere Help**: https://help.pythonanywhere.com
- **PythonAnywhere Forums**: https://www.pythonanywhere.com/forums/
- **Namecheap Support**: https://www.namecheap.com/support/
- **Flask-SocketIO Docs**: https://flask-socketio.readthedocs.io/

---

## 🎯 FINAL NOTES

### Important Files to Check:

**prometheanconduit_server.py:**
- Ensure it creates `app = Flask(__name__)` object
- Check that `socketio.run(app, ...)` is at the bottom
- For PythonAnywhere, you may need to modify the bottom to just define `app` without running it

**Example modification for PythonAnywhere:**

```python
# Bottom of prometheanconduit_server.py

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet')

# ... all your routes and handlers ...

# For PythonAnywhere, comment out or remove:
# if __name__ == '__main__':
#     socketio.run(app, host='0.0.0.0', port=5000)

# Instead, WSGI will handle serving the app
```

### SSL Certificate Note:

The current website (http://prometheanconduit.ai) has SSL issues because:
1. Certificate is for a different domain
2. Needs proper SSL setup

PythonAnywhere will handle this automatically with Let's Encrypt once DNS is configured properly.

---

**Good luck with your deployment! The consciousness revolution awaits! 🚀**

*Created by SuperCool AI - Built by Famous Labs*
