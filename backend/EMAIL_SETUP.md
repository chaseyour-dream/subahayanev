# Email Setup Guide for Shubhayaan EV

## Gmail App Password Setup

To enable email notifications for contact and test drive enquiries, you need to set up a Gmail App Password:

### Steps:

1. **Enable 2-Factor Authentication on Gmail**
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification if not already enabled

2. **Generate App Password**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" as the app
   - Select "Other" as the device and name it "Shubhayaan EV Website"
   - Click "Generate"
   - Copy the 16-character password (it will look like: xxxx xxxx xxxx xxxx)

3. **Update Django Settings**
   - Open `backend/shubhayaan_ev/settings.py`
   - Find the line: `EMAIL_HOST_PASSWORD = ''`
   - Replace it with: `EMAIL_HOST_PASSWORD = 'your-16-character-app-password'`
   - Remove spaces from the app password

### Example:
```python
EMAIL_HOST_PASSWORD = 'abcdabcdabcdabcd'  # Replace with your actual app password
```

## Testing Email Functionality

After setting up the app password:

1. Restart your Django server
2. Submit a contact form or test drive request from the website
3. Check the inbox of shubhayaanmotors@gmail.com
4. You should receive an email notification with the enquiry details

## Email Configuration Details

- **Email Backend**: Gmail SMTP
- **Host**: smtp.gmail.com
- **Port**: 587 (TLS)
- **From Email**: shubhayaanmotors@gmail.com
- **Admin Email**: shubhayaanmotors@gmail.com

## Troubleshooting

If emails are not being sent:

1. Check that the app password is correct (no spaces)
2. Verify 2-Factor Authentication is enabled on the Gmail account
3. Check Django server logs for error messages
4. Ensure your server has internet connectivity
5. Try sending a test email using Django shell:

```python
python manage.py shell

from django.core.mail import send_mail
from django.conf import settings

send_mail(
    'Test Email',
    'This is a test email from Shubhayaan EV',
    settings.DEFAULT_FROM_EMAIL,
    ['shubhayaanmotors@gmail.com'],
    fail_silently=False,
)
```

## Security Note

- Never commit the app password to version control
- Consider using environment variables for production:
  ```python
  import os
  EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD', '')
  ```
