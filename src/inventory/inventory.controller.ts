import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryItem } from './inventory.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  @Roles('admin', 'auditor') // Both Admin and Auditor can access
  findAll(@Request() req): Promise<InventoryItem[]> {
    return this.inventoryService.findAll();
  }

  @Post()
  @Roles('admin') // Only Admin can create
  create(@Body() item: Partial<InventoryItem>): Promise<InventoryItem> {
    return this.inventoryService.create(item);
  }

  @Put(':id')
  @Roles('admin') // Only Admin can update
  update(@Param('id') id: number, @Body() item: Partial<InventoryItem>): Promise<void> {
    return this.inventoryService.update(id, item);
  }

  @Delete(':id')
  @Roles('admin') // Only Admin can delete
  remove(@Param('id') id: number): Promise<void> {
    return this.inventoryService.remove(id);
  }
}
