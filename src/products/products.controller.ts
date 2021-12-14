import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    @Get()
    getAllProducts(): string {
        return 'Devuelve todos los productos'
    }

    @Post()
    createProduct(): string {
        return 'Crea un producto'
    }

    @Put(':id')
    updateProduct(@Param('id') idProduct: String): string {
        return 'Modifica un producto `${id}`'
    }

    @Delete(':id')
    deleteProduct(@Param('id') idProduct: String): string {
        return 'Borra un producto `${id}`'
    }
}
