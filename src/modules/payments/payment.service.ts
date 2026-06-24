import { PaymentRepository } from './payment.repository';
import { CreatePaymentDto, UpdatePaymentDto } from './payment.dto';

class PaymentService {
  async findAll() {
    return PaymentRepository.find();
  }

  async findById(id: string) {
    return PaymentRepository.findOne({
      where: { id },
    });
  }

  async create(payload: CreatePaymentDto) {
    const data = PaymentRepository.create(payload);

    return PaymentRepository.save(data);
  }

  async update(id: string, payload: UpdatePaymentDto) {
    await PaymentRepository.update(id, payload);

    return this.findById(id);
  }

  async delete(id: string) {
    await PaymentRepository.delete(id);

    return true;
  }
}

export default new PaymentService();
