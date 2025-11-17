<?php
	if (isset($_POST["submit"])) {
		$name = $_POST['name'];
		$email = $_POST['email'];
		$message = $_POST['message'];
		$from = $email;  // Email of the person filling the form
		$to = 'support@itechfixr.com'; // Updated email address
		$subject = $_POST['subject']; 
		
		// Message body
		$body = "From: $name\nE-Mail: $email\nSubject: $subject\nMessage:\n$message";
		
		// Proper headers
		$headers = "From: $from\r\n";
		$headers .= "Reply-To: $email\r\n";
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

		// Send email
		if (mail($to, $subject, $body, $headers)) {
			// Redirect to thank you page on success
			header("Location: https://www.itechfixr.com");
			exit;  // Ensure the rest of the code is not executed after redirection
		} else {
			// Error message if the email fails to send
			die("Error sending email.");
		}
	}
?>
