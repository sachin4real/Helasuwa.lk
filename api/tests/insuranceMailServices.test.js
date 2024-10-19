// tests/insuranceMailServices.test.js

const nodemailer = require('nodemailer');
const { sendClaimEmail } = require('../services/insuranceMailServices');

// Mock the entire nodemailer module
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({}), // Mock sendMail function
  }),
}));

describe('sendClaimEmail', () => {
  const patientEmail = 'patient@example.com';
  let mockSendMail;

  beforeEach(() => {
    // Get the sendMail mock function
    mockSendMail = nodemailer.createTransport().sendMail;
    mockSendMail.mockClear(); // Clear the mock before each test
  });

  it('should send an email successfully', async () => {
    // Mock sendMail to resolve successfully
    mockSendMail.mockResolvedValueOnce({});

    // Call the sendClaimEmail function
    await sendClaimEmail(patientEmail);

    // Ensure sendMail was called with the correct mail options
    expect(mockSendMail).toHaveBeenCalledWith({
      from: 'helasuwa@zohomail.com',
      to: patientEmail,
      subject: 'Insurance Claim Request Received',
      text: `Hello,\nYour insurance claim request has been received and is being processed. The insurance company will review your claim and inform you of further details shortly.`,
    });
  });

  it('should handle errors during email sending', async () => {
    // Mock sendMail to reject with an error
    mockSendMail.mockRejectedValueOnce(new Error('Failed to send email'));

    // Call the sendClaimEmail function
    await sendClaimEmail(patientEmail);

    // Ensure sendMail was called even if it failed
    expect(mockSendMail).toHaveBeenCalled();
  });
});
