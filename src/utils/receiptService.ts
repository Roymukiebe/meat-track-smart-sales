
interface ReceiptData {
  receiptNumber: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
    unit: string;
  }>;
  customerName?: string;
  staffName?: string;
  paymentMethod: string;
  paymentReference: string;
  total: number;
  date: string;
}

export const generateReceiptNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear().toString().substr(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const time = Date.now().toString().substr(-6);
  return `TMC${year}${month}${day}${time}`;
};

export const generateReceiptHTML = (data: ReceiptData): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Receipt ${data.receiptNumber}</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 300px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 10px; }
        .logo { background: #000; color: white; padding: 10px; border-radius: 5px; display: inline-block; margin-bottom: 10px; }
        .receipt-title { font-size: 18px; font-weight: bold; margin: 10px 0; }
        .info { margin: 5px 0; font-size: 12px; }
        .items { margin: 10px 0; }
        .item { display: flex; justify-content: space-between; margin: 5px 0; font-size: 12px; }
        .total { font-size: 16px; font-weight: bold; border-top: 1px solid #000; padding-top: 5px; margin-top: 10px; }
        .payment { margin: 10px 0; font-size: 12px; }
        .footer { text-align: center; font-size: 10px; margin-top: 20px; border-top: 1px solid #000; padding-top: 10px; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">TMC</div>
        <h1>Thika Meat Centre</h1>
        <p>Quality Meat Products</p>
        <p>P.O. Box 123, Thika, Kenya</p>
        <p>Tel: +254 712 345 678</p>
      </div>
      
      <div class="receipt-title">SALES RECEIPT</div>
      <div class="info">Receipt No: ${data.receiptNumber}</div>
      <div class="info">Date: ${data.date}</div>
      ${data.customerName ? `<div class="info">Customer: ${data.customerName}</div>` : ''}
      ${data.staffName ? `<div class="info">Served by: ${data.staffName}</div>` : ''}
      
      <div class="items">
        <strong>ITEMS PURCHASED:</strong>
        ${data.items.map(item => `
          <div class="item">
            <div>
              <div>${item.name}</div>
              <div style="font-size: 10px; color: #666;">${item.quantity} ${item.unit} × KSh ${item.price.toLocaleString()}</div>
            </div>
            <div>KSh ${item.total.toLocaleString()}</div>
          </div>
        `).join('')}
      </div>
      
      <div class="total">
        <div style="display: flex; justify-content: space-between;">
          <span>TOTAL:</span>
          <span>KSh ${data.total.toLocaleString()}</span>
        </div>
      </div>
      
      <div class="payment">
        <div>Payment Method: ${data.paymentMethod}</div>
        <div>Reference: ${data.paymentReference}</div>
        <div style="color: green; font-weight: bold;">✓ PAYMENT SUCCESSFUL</div>
      </div>
      
      <div class="footer">
        <p>Thank you for your business!</p>
        <p>Goods sold are not returnable</p>
        <p>Visit us again soon</p>
      </div>
    </body>
    </html>
  `;
};

export const downloadReceiptAsPDF = (data: ReceiptData) => {
  const htmlContent = generateReceiptHTML(data);
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `receipt-${data.receiptNumber}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const printReceipt = (data: ReceiptData) => {
  const htmlContent = generateReceiptHTML(data);
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }
};
