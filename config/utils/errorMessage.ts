export const getFriendlyError = (code: string) => {
  switch (code) {
    case 'auth/invalid-email':
      return 'Invalid email address.';
    case 'auth/email-already-in-use':
      return 'This email is already registered. Try logging in instead.';
    case 'auth/weak-password':
      return 'Your password is too weak. Use at least 8 characters.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-credential':
      return 'Invalid credential.';
    default:
      return 'Something went wrong. Please try again.';
  }
};
