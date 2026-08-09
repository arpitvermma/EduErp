import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal, Badge } from '../../components/ui';
import { FEE_STRUCTURE } from '../../data/mockData';
import { CreditCard, Receipt, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function StudentFees() {
  const { user, students, updateStudent } = useApp();
  const me = students.find(s => s.id === user?.id) || students[0];
  const [payModal, setPayModal] = useState(false);
  const [receiptModal, setReceiptModal] = useState(false);
  const [processing, setProcessing] = useState(false);

  const total = FEE_STRUCTURE.reduce((s, f) => s + f.amount, 0);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      updateStudent(me.id, { fees: 'Paid' });
      setProcessing(false);
      setPayModal(false);
      toast.success('Payment successful!');
    }, 1200);
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Fee Payment</div>
        <div className="page-subtitle">View fee structure and make payments</div>
      </div>

      <div className="card p-6 mb-6" style={{ background: me?.fees === 'Paid' ? 'linear-gradient(135deg, #ECFDF5, #D1FAE5)' : 'linear-gradient(135deg, #FEF2F2, #FEE2E2)' }}>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm" style={{ color: me?.fees === 'Paid' ? '#065F46' : '#991B1B' }}>Current Status</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: me?.fees === 'Paid' ? '#065F46' : '#991B1B' }}>
              {me?.fees === 'Paid' ? 'All Fees Paid ✓' : `₹${total.toLocaleString('en-IN')} Due`}
            </div>
          </div>
          {me?.fees === 'Paid' ? (
            <button className="btn btn-secondary" onClick={() => setReceiptModal(true)}><Receipt size={15} /> View Receipt</button>
          ) : (
            <button className="btn btn-primary btn-lg" onClick={() => setPayModal(true)}><CreditCard size={16} /> Pay Now</button>
          )}
        </div>
      </div>

      <div className="card">
        <div className="p-4" style={{ borderBottom: '1px solid var(--border)', fontWeight: 700, fontSize: 15 }}>Fee Structure - Semester {me?.semester}</div>
        <table className="table">
          <thead><tr><th>Category</th><th>Period</th><th>Amount</th></tr></thead>
          <tbody>
            {FEE_STRUCTURE.map(f => (
              <tr key={f.id}>
                <td className="font-semibold">{f.category}</td>
                <td>{f.period}</td>
                <td>₹{f.amount.toLocaleString('en-IN')}</td>
              </tr>
            ))}
            <tr>
              <td className="font-semibold" colSpan={2}>Total</td>
              <td className="font-semibold text-primary">₹{total.toLocaleString('en-IN')}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Modal
        open={payModal}
        onClose={() => setPayModal(false)}
        title="Pay Fees"
        footer={<>
          <button className="btn btn-secondary" onClick={() => setPayModal(false)} disabled={processing}>Cancel</button>
          <button className="btn btn-primary" onClick={handlePay} disabled={processing}>
            {processing ? 'Processing...' : `Pay ₹${total.toLocaleString('en-IN')}`}
          </button>
        </>}
      >
        <div className="form-group">
          <label className="form-label">Payment Method</label>
          <select className="form-control">
            <option>UPI</option>
            <option>Credit / Debit Card</option>
            <option>Net Banking</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Card / UPI ID</label>
          <input className="form-control" placeholder="yourname@upi" />
        </div>
        <div className="card p-4" style={{ background: 'var(--bg)' }}>
          <div className="flex justify-between"><span className="text-sm text-muted">Amount to Pay</span><span className="font-semibold">₹{total.toLocaleString('en-IN')}</span></div>
        </div>
        <div className="text-xs text-muted">This is a mock payment gateway for demonstration purposes only.</div>
      </Modal>

      <Modal open={receiptModal} onClose={() => setReceiptModal(false)} title="Payment Receipt">
        <div style={{ textAlign: 'center' }}>
          <CheckCircle size={40} color="var(--success)" style={{ margin: '0 auto 12px' }} />
          <div style={{ fontWeight: 700, fontSize: 18 }}>Payment Successful</div>
          <div className="text-sm text-muted mb-4">Receipt #RCP{me?.id}</div>
          <div className="card p-4" style={{ textAlign: 'left' }}>
            <div className="flex justify-between mb-2"><span className="text-muted">Student</span><span className="font-semibold">{me?.name}</span></div>
            <div className="flex justify-between mb-2"><span className="text-muted">Semester</span><span className="font-semibold">Sem {me?.semester}</span></div>
            <div className="flex justify-between mb-2"><span className="text-muted">Amount Paid</span><span className="font-semibold">₹{total.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between"><span className="text-muted">Status</span><Badge type="success">Paid</Badge></div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
