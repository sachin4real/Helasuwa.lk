import React from 'react';
import '../../styles/PrescriptionDetails.css';
import jsPDF from 'jspdf';
import CardPayment from './CardPayment';

export default function PrescriptionDetails({ prescription, onBack }) {

    // Function to calculate total amount by parsing the text field
    function calculateTotalAmount() {
        const regex = /Price:\s*\$(\d+\.\d{2})/g;
        let total = 0;
        let match;

        while ((match = regex.exec(prescription.text)) !== null) {
            total += parseFloat(match[1]);
        }
        return total;
    }

    function downloadPrescription() {
        const doc = new jsPDF();
        
        doc.setFontSize(18);
        doc.text("Prescription Details", 10, 10);
        
        doc.setFontSize(12);
        doc.text(`Prescription ID: ${prescription._id}`, 10, 30);
        doc.text(`Appointment ID: ${prescription.appointment || 'N/A'}`, 10, 40);
        doc.text(`Date: ${new Date(prescription.date).toLocaleString()}`, 10, 50);
        doc.text("Prescription:", 10, 60);

        const prescriptionText = prescription.text || "No details available";
        const splitText = doc.splitTextToSize(prescriptionText, 180);
        doc.text(splitText, 10, 70);

        const totalAmount = calculateTotalAmount();
        doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, 10, 90 + splitText.length * 10);

        doc.save(`Prescription_${prescription._id}.pdf`);
    }

    return (
        <div className="prescription-page-container">
            <div className="prescription-details-container">
                <button className="download-btn-pres" onClick={onBack}>Back to All Prescriptions</button>
                <h2>Prescription Details</h2>
                <p><strong>Prescription Id:</strong> {prescription._id}</p>
                <p><strong>Appointment Id:</strong> {prescription.appointment || 'N/A'}</p>
                <p><strong>Date:</strong> {new Date(prescription.date).toLocaleString()}</p>
                <p><strong>Prescription:</strong> {prescription.text}</p>

                <p><strong>Total Amount:</strong> ${calculateTotalAmount().toFixed(2)}</p>

                <button 
                    className="download-btn-pres" 
                    onClick={(e) => {
                        e.stopPropagation();
                        downloadPrescription();
                    }}
                >
                    Download
                </button>
            </div>

            {/* Card Payment Container */}
            <div className="card-payment-container">
                <CardPayment />
            </div>
        </div>
    );
}
