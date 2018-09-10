export class MessageSendRequest {
  from: string;                 // Email address for From header
  to: string;                   // Email address of the recipient(s). Example: "Bob <bob@host.com>". You can use commas to separate multiple recipients.
  cc: string;                   // Same as To but for Cc
  bcc: string;                  // Same as To but for Bcc
  subject: string;              // Message subject
  text: string;                 // Body of the message. (text version)
  html: string;                 // Body of the message. (HTML version)
  attachment: string;           // File attachment. You can post multiple attachment values. Important: You must use multipart/form-data encoding when sending attachments.
  inline: string;               // Attachment with inline disposition. Can be used to send inline images (see example). You can post multiple inline values.
  'o:tag': string; 	            // Tag string. See Tagging for more information.
  'o:dkim': string; 	          // Enables/disables DKIM signatures on per-message basis. Pass yes or no
  'o:deliverytime': string; 	  // Desired time of delivery. See Date Format. Note: Messages can be scheduled for a maximum of 3 days in the future.
  'o:testmode': string; 	      // Enables sending in test mode. Pass yes if needed. See Sending in Test Mode
  'o:tracking': string; 	      // Toggles tracking on a per-message basis, see Tracking Messages for details. Pass yes or no.
  'o:tracking-clicks': string;  // Toggles clicks tracking on a per-message basis. Has higher priority than domain-level setting. Pass yes, no or htmlonly.
  'o:tracking-opens': string;   // Toggles opens tracking on a per-message basis. Has higher priority than domain-level setting. Pass yes or no.
  'o:require-tls': string;
  'o:skip-verification': string;
  'h:X-My-Header': string;      // h: prefix followed by an arbitrary value allows to append a custom MIME header to the message (X-My-Header in this case). For example, h:Reply-To to specify Reply-To address.
  'v:my-var': string;           // v: prefix followed by an arbitrary name allows to attach a custom JSON data to the message. See Attaching Data to Messages for more information.
}

export class MessageSendResponse {

}
