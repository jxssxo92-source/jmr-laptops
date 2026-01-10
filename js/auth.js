// ===============================
// PERSISTENT LOGIN ("REMEMBER ME")
// ===============================
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .catch(err => console.error(err));


// ===============================
// NAVBAR + DROPDOWN HANDLING
// ===============================
document.addEventListener("DOMContentLoaded", () => {

    auth.onAuthStateChanged(user => {
        const nav = document.getElementById("navLinks");
        const dropdown = document.getElementById("profileDropdown");

        if (!nav) return; // Page has no navbar

        // Remove old injected login/signup/email/logout
        nav.querySelectorAll(".auth-btn-nav").forEach(el => el.remove());

        // If a dropdown container exists, reset it
        if (dropdown) {
            dropdown.innerHTML = "";
            dropdown.classList.add("hidden");
        }

        if (user) {
            // ============================
            // LOGGED IN UI
            // ============================
            const emailTag = document.createElement("span");
            emailTag.textContent = user.email;
            emailTag.classList.add("auth-btn-nav");
            emailTag.style.opacity = "0.8";
            emailTag.style.cursor = "pointer";

            if (dropdown) {
                // Clicking email toggles dropdown
                emailTag.onclick = () => {
                    dropdown.classList.toggle("hidden");
                };

                // Build dropdown content
                dropdown.innerHTML = `
                    <a href="profile.html">My Profile</a>
                    <a href="order-history.html">My Orders</a>
                    <button id="logoutBtn">Logout</button>
                `;

                // Attach logout handler AFTER the DOM is updated
                setTimeout(() => {
                    const logoutBtn = document.getElementById("logoutBtn");
                    if (logoutBtn) {
                        logoutBtn.onclick = () => {
                            auth.signOut().then(() => {
                                window.location = "index.html";
                            });
                        };
                    }
                }, 0);
            } else {
                // Fallback if no dropdown container on this page
                const logoutBtn = document.createElement("button");
                logoutBtn.textContent = "Logout";
                logoutBtn.classList.add("auth-btn-nav");
                logoutBtn.style.padding = "0.4rem 1rem";
                logoutBtn.onclick = () => {
                    auth.signOut().then(() => {
                        window.location = "index.html";
                    });
                };
                nav.appendChild(logoutBtn);
            }

            nav.appendChild(emailTag);

        } else {
            // ============================
            // LOGGED OUT UI
            // ============================
            const loginLink = document.createElement("a");
            loginLink.href = "login.html";
            loginLink.textContent = "Login";
            loginLink.classList.add("auth-btn-nav");

            const signupLink = document.createElement("a");
            signupLink.href = "signup.html";
            signupLink.textContent = "Sign Up";
            signupLink.classList.add("auth-btn-nav");

            nav.appendChild(loginLink);
            nav.appendChild(signupLink);
        }
    });

});
