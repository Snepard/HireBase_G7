document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('resumeForm');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const resumePreview = document.getElementById('resumePreview');
    
    generateBtn.addEventListener('click', generateResume);
    downloadBtn.addEventListener('click', downloadResume);
    
    function generateResume() {
        // Get form values
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const degree = document.getElementById('degree').value;
        const university = document.getElementById('university').value;
        const gradYear = document.getElementById('gradYear').value;
        const jobTitle = document.getElementById('jobTitle').value;
        const company = document.getElementById('company').value;
        const jobDescription = document.getElementById('jobDescription').value;
        
        // Validate required fields
        if (!fullName || !email) {
            alert('Please fill in at least your name and email');
            return;
        }
        
        // Generate HTML for the resume
        let resumeHTML = `
            <div class="generated-resume">
                <h1>${fullName}</h1>
                <div class="contact-info">
                    ${email ? `<p>Email: ${email}</p>` : ''}
                    ${phone ? `<p>Phone: ${phone}</p>` : ''}
                    ${address ? `<p>Address: ${address}</p>` : ''}
                </div>
        `;
        
        // Add education section if data exists
        if (degree || university || gradYear) {
            resumeHTML += `
                <section class="education-section">
                    <h2>Education</h2>
                    <div class="education">
                        ${degree ? `<p class="degree">${degree}</p>` : ''}
                        ${university ? `<p class="university">${university}</p>` : ''}
                        ${gradYear ? `<p class="dates">Graduated: ${gradYear}</p>` : ''}
                    </div>
                </section>
            `;
        }
        
        // Add experience section if data exists
        if (jobTitle || company || jobDescription) {
            resumeHTML += `
                <section class="experience-section">
                    <h2>Work Experience</h2>
                    <div class="job">
                        ${jobTitle ? `<p class="job-title">${jobTitle}</p>` : ''}
                        ${company ? `<p class="company">${company}</p>` : ''}
                        ${jobDescription ? `<p class="job-description">${jobDescription}</p>` : ''}
                    </div>
                </section>
            `;
        }
        
        resumeHTML += `</div>`;
        
        // Update the preview
        resumePreview.innerHTML = resumeHTML;
        
        // Enable download button
        downloadBtn.disabled = false;
    }
    
    function downloadResume() {
        alert('In a complete application, this would generate a PDF. For now, you can print this page (Ctrl+P) and save as PDF.');
        // Note: For actual PDF generation, you would use a library like jsPDF or html2pdf.js
    }
    
    // Sample data for demonstration (optional)
    function loadSampleData() {
        document.getElementById('fullName').value = 'John Doe';
        document.getElementById('email').value = 'john.doe@example.com';
        document.getElementById('phone').value = '(123) 456-7890';
        document.getElementById('address').value = '123 Main St, Anytown, USA';
        document.getElementById('degree').value = 'Bachelor of Science in Computer Science';
        document.getElementById('university').value = 'State University';
        document.getElementById('gradYear').value = '2020';
        document.getElementById('jobTitle').value = 'Software Developer';
        document.getElementById('company').value = 'Tech Solutions Inc.';
        document.getElementById('jobDescription').value = 'Developed web applications using JavaScript and React. Collaborated with team members on agile projects.';
    }
    
    // Uncomment to load sample data automatically
    // loadSampleData();
});