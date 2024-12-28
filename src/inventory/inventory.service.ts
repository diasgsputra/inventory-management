import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryItem } from './inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryItem)
    private inventoryRepository: Repository<InventoryItem>,
  ) {}

  findAll(): Promise<InventoryItem[]> {
    return this.inventoryRepository.find();
  }

  create(item: Partial<InventoryItem>): Promise<InventoryItem> {
    return this.inventoryRepository.save(item);
  }

  update(id: number, item: Partial<InventoryItem>): Promise<void> {
    return this.inventoryRepository.update(id, item).then(() => {});
  }

  remove(id: number): Promise<void> {
    return this.inventoryRepository.delete(id).then(() => {});
  }
}
