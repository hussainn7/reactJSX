from flask import Flask, request, jsonify
from email.message import EmailMessage
import smtplib
import ssl
from flask_cors import CORS
import os


app = Flask(__name__)
CORS(app)
# Email Configuration
EMAIL_SENDER = 'misterroyal1990@gmail.com'  # Sender email
EMAIL_PASSWORD = 'fcpf uoln rsal faun'  # App-specific password
EMAIL_RECEIVER = 'scaleupagencydigital@gmail.com'  # Receiver email

# Function to send email
def send_email(to_email, subject, body_text):
    try:
        print("Preparing to send email...")  # Debugging
        # Create the email message
        em = EmailMessage()
        em['From'] = EMAIL_SENDER
        em['To'] = to_email
        em['Subject'] = subject
        em.set_content(body_text)

        # Set up the secure SSL context
        context = ssl.create_default_context()
        print("Connecting to SMTP server...")  # Debugging
        with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
            smtp.login(EMAIL_SENDER, EMAIL_PASSWORD)
            print(f"Sending email to {to_email}...")  # Debugging
            smtp.sendmail(EMAIL_SENDER, to_email, em.as_string())
        print("Email sent successfully!")  # Debugging
        return True
    except Exception as e:
        print(f"Error sending email: {e}")  # Debugging
        return False


@app.route('/send-email', methods=['POST'])
def send_email_endpoint():
    print("Request method:", request.method)  # Log request method
    print("Request JSON:", request.json)      # Log received data
    try:
        print("Received a POST request to /send-email.")  # Debugging
        # Get JSON data from the request
        data = request.json
        print("Request data:", data)  # Debugging

        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        # Validate input
        if not name or not email or not message:
            print("Missing fields in the request.")  # Debugging
            return jsonify({"message": "All fields are required"}), 400

        # Prepare email content
        subject = "New Contact Form Submission"
        body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
        print("Prepared email content:", body)  # Debugging

        # Send the email
        email_sent = send_email(EMAIL_RECEIVER, subject, body)

        if email_sent:
            print("Email sending process completed successfully.")  # Debugging
            return jsonify({"message": "Message sent successfully!"}), 200
        else:
            print("Failed to send the email.")  # Debugging
            return jsonify({"message": "Failed to send email."}), 500
    except Exception as e:
        print(f"An error occurred: {e}")  # Print the error in the server logs
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500


if __name__ == '__main__':
    print("Starting Flask server...")
    port = int(os.environ.get("PORT", 5000))  # Use the PORT environment variable or default to 5000
    app.run(host="0.0.0.0", port=port, debug=True)
