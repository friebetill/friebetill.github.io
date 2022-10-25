document.getElementById("sendSignal").onclick = () => {
  let from_name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("message").value;

  if (from_name === "" || email === "" || subject === "" || message === "") {
    document.getElementById("sentMessage").style.display = "none";
    document.getElementById("errorMessage").style.display = "block";
  } else {
    let s = {
      fromName: from_name,
      email: email,
      subject: subject,
      message: message,
      replyTo: "friebetill@gmail.com",
    };

    const serviceID = 'gmail';
    const templateID = 'website_form_template';

    emailjs.send(serviceID, templateID, s).then(
      function (e) {
        console.log("SUCCESS!", e.status, e.text);
      },
      function (e) {
        console.log("FAILED...", e);
      }
    );

    document.getElementById("errorMessage").style.display = "none";
    document.getElementById("loading").style.display = "block";

    setTimeout(() => {
      document.getElementById("loading").style.display = "none";
      document.getElementById("sentMessage").style.display = "block";
    }, 0.001);
  }
};
