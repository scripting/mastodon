const appConsts = {
	
	};
function startButtons () {
	const loginbutton = $("#idMastoSignonButton");
	loginbutton.click (function () {
		console.log ("Click");
		loginbutton.blur ();
		userLogin (mastodonMemory.clientKey);
		});
	
	const signoffbutton = $("#idMastoSignoffButton");
	signoffbutton.click (function () {
		for (var x in mastodonMemory) {
			mastodonMemory [x] = undefined;
			}
		saveMastodonMemory ();
		});
	
	const mastotootbutton = $("#idMastoTootButton");
	mastotootbutton.click (function () {
		askDialog ("What would you like to toot?", mastodonMemory.lastTootString, "Oh say can you toot.", function (tootableString, flcancel) {
			if (!flcancel) {
				mastodonMemory.lastTootString = tootableString;
				saveMastodonMemory ();
				postNewStatus (tootableString, "109395259673331210", function (err, data) {
					if (err) {
						alertDialog (err.message);
						}
					else {
						console.log ("mastotootbutton: data == " + jsonStringify (data));
						}
					});
				}
			});
		});
	}
function everySecond () {
	const flSignedOn = mastodonMemory.access_token !== undefined;
	if (flSignedOn) {
		$("#idSignedOn").css ("display", "block");
		$("#idSignedOff").css ("display", "none");
		}
	else {
		$("#idSignedOn").css ("display", "none");
		$("#idSignedOff").css ("display", "block");
		}
	}
function startup () {
	
	console.log ("startup");
	restoreMastodonMemory ();
	lookForOauthToken (); //if found it doesn't return
	startButtons ();
	self.setInterval (everySecond, 1000);
	}
