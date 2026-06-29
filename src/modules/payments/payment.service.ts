import { PaymentRepository } from './payment.repository';
import { CreatePaymentDto, UpdatePaymentDto } from './payment.dto';
import { PaymentStatus } from './payment.interface';

class PaymentService {
  async findAll() {
    return PaymentRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findById(id: string) {
    return PaymentRepository.findOne({
      where: { id },
    });
  }

  async findByBookingId(bookingId: string) {
    return PaymentRepository.findOne({
      where: { bookingId },
    });
  }

  async create(payload: CreatePaymentDto) {
    const payment = PaymentRepository.create({
      ...payload,
      currency: payload.currency || 'PHP',
    });

    return PaymentRepository.save(payment);
  }

  async update(id: string, payload: UpdatePaymentDto) {
    const updatePayload: any = { ...payload };

    if (payload.status === PaymentStatus.PAID) {
      updatePayload.paidAt = new Date();
    }

    await PaymentRepository.update(id, updatePayload);

    return this.findById(id);
  }

  async markAsPaid(id: string, providerReferenceId?: string) {
    await PaymentRepository.update(id, {
      status: PaymentStatus.PAID,
      providerReferenceId,
      paidAt: new Date(),
    });

    return this.findById(id);
  }

  async markAsFailed(id: string, failedReason?: string) {
    await PaymentRepository.update(id, {
      status: PaymentStatus.FAILED,
      failedReason,
    });

    return this.findById(id);
  }

  async delete(id: string) {
    await PaymentRepository.delete(id);

    return true;
  }
}

export default new PaymentService();