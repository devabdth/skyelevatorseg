class EmailPlugin:
	def __init__(self):
		pass
	
	def send_ticket_email(self, email):
		try:
			if email is None:
				return False
			return True
		except Exception as e:
			print(e)
			return False
		
	def send_otp_email(self, otp, recipent, name):
		pass
		return
		template= '''<html lang="en"><head></head><body><meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<style>
		body {
			font-family: Raleway, Poppins;
			margin: 0;
			padding: 0;
			background-color: #f4f4f4;
		}

		.container {
			width: 100%;
			max-width: 600px;
			margin: 0 auto;
			padding: 20px;
			box-sizing: border-box;
			background-color: #ffffff;
			border-radius: 5px;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		}

		h1 {
			color: #111111;
		}

		p {
			color: #444444;
		}

		.otp-container {
			background-color: #f9f9f9;
			padding: 10px;
			border-radius: 5px;
			margin-top: 20px;
		}

		.otp-code {
			font-size: 2em;
			color: #8e00be;font-weight: 900; text-align: center;
		}

		.footer {
			margin-top: 20px;
			text-align: center;
			color: #777777;
		}
	</style>


	<div class="container">
		<div class="header">
			<h1>Forexology - فوركسلوجي</h1>
		</div>
		<h1>OTP Code for Verification</h1>
		<p>Dear '''+ name +''',</p>
		<p>Your OTP code for verification is:</p>
		
		<div class="otp-container">
			<p class="otp-code">'''+ otp +'''</p>
		</div>

		<p>Please use this code to complete the verification process. The code is valid for a limited time.</p>

		<div class="footer">
			<p>This email was sent by Your Forexology Inc.</p>
			<div ckass="social-media-links>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
			</div>
		</div>
	</div></body></html>'''
	
		try:
			import smtplib
			from email.mime.text import MIMEText

			msg: MIMEText= MIMEText(template, "html")
			msg['Subject']= "Verify Your E-Mail"
			msg['To']= recipent
			msg['from']= self.cfg.email_model_email
			print('ONE')
			server= smtplib.SMTP_SSL("smtp.zoho.com", 465)
			server.login(self.cfg.email_model_email, self.cfg.email_model_access_key)

			server.sendmail(self.cfg.email_model_email, [recipent], msg.as_string())
			server.quit()
		except Exception as e:
			print(e)
