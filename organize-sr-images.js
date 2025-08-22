const fs = require('fs');
const path = require('path');

// Image mapping for better organization
const imageMapping = {
  'personal-loan': [
    '07a2eb88-3963-473c-86c2-6ba957b57aa5.png',
    '0f27e4b0-4304-4738-91a1-f3fff2f1a264.png',
    'unnamed.png',
    'unnamed (1).png'
  ],
  'business-loan': [
    '30c97679-f073-41f7-9dc5-dd8f16697e27.png',
    '2c4992b6-cbc6-4e1f-9115-6ef7f6364f60.png',
    'unnamed (2).png',
    'unnamed (3).png'
  ],
  'education-loan': [
    '5a1211be-6188-4c3d-9cd5-4d99cd6e06d8.png',
    '5d44ac8f-6c7a-4589-997d-10a2ab7156a2.png',
    'unnamed (4).png',
    'unnamed (5).png'
  ],
  'home-loan': [
    '61dc049f-3b5c-46b0-bcc0-682501cc829b.png',
    '5f4dc4e8-9142-41d4-8b44-fe791f179271.png',
    'unnamed (6).png',
    'unnamed (7).png'
  ],
  'vehicle-loan': [
    '8613ba2c-d07a-4f3e-aa77-708765df3200.png',
    '74f14bc9-46d6-44e2-bb44-b725a302f2ee.png',
    'unnamed (8).png'
  ],
  'mortgage-loan': [
    'c14ca927-85e0-43c9-b6ed-0359cf5eed6b.png',
    'c17fa9a8-d24d-46ad-a2bb-98ff6983b0cd.png',
    'bae62fcc-7f94-4e73-b453-d6744ce6770a.png'
  ],
  'testimonials': [
    'bed14fa5-1dfa-4685-809a-0ac76d4c5b47.png',
    'bae62fcc-7f94-4e73-b453-d6744ce6770a.png',
    '863535ee-6fe6-4e11-a6b1-4901de22c563.png'
  ],
  'additional': [
    '77aaf864-0586-4dda-861b-49bb51e775ff.png',
    'e48a7928-5be5-4d8a-8d9a-1d9c6d391d80.png'
  ]
};

const sourcePath = '/Users/soumithvardhan/Desktop/SR Associates pics/Loans Section';
const targetBasePath = '/Users/soumithvardhan/Desktop/FinBridge/public/images/loans/sr-associates';

// Create organized folders
Object.keys(imageMapping).forEach(category => {
  const categoryPath = path.join(targetBasePath, category);
  if (!fs.existsSync(categoryPath)) {
    fs.mkdirSync(categoryPath, { recursive: true });
  }
});

console.log('✅ SR Associates image organization structure created!');
console.log('📁 Categories created:', Object.keys(imageMapping));

// Instructions for manual copying
console.log('\n🔄 To complete the setup:');
console.log('1. Run: cd /Users/soumithvardhan/Desktop/FinBridge');
console.log('2. Copy images manually or use the provided script');
console.log('3. Restart your development server');

module.exports = { imageMapping };
