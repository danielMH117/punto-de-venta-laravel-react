<?php

namespace Database\Seeders;

use App\Models\Producto;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $productos = [
            // === PROCESADORES (6) ===
            [
                'nombre' => 'Procesador AMD Ryzen 5 5600X',
                'categoria' => 'Procesadores',
                'descripcion' => '6 núcleos y 12 hilos, 3.7GHz (hasta 4.6GHz), Socket AM4.',
                'precio' => 2499.00,
                'stock' => 15,
                'imagen_url' => 'https://ddtech.mx/assets/uploads/862ee0f92b4f5ad38d1d8644529c980c.jpg'
            ],
            [
                'nombre' => 'Procesador Intel Core i5-13400F',
                'categoria' => 'Procesadores',
                'descripcion' => '10 núcleos (6 P-cores + 4 E-cores), hasta 4.6GHz, LGA1700.',
                'precio' => 3200.00,
                'stock' => 12,
                'imagen_url' => 'https://m.media-amazon.com/images/I/6138mFBll6L._AC_UF894,1000_QL80_.jpg'
            ],
            [
                'nombre' => 'Procesador AMD Ryzen 7 7800X3D',
                'categoria' => 'Procesadores',
                'descripcion' => 'El rey del gaming. 8 núcleos, 16 hilos, 3D V-Cache, Socket AM5.',
                'precio' => 7499.00,
                'stock' => 8,
                'imagen_url' => 'https://m.media-amazon.com/images/I/51HqC0rU9HL._AC_UF894,1000_QL80_.jpg'
            ],
            [
                'nombre' => 'Procesador Intel Core i7-14700K',
                'categoria' => 'Procesadores',
                'descripcion' => '20 núcleos, hasta 5.6GHz, ideal para streaming y renderizado pesado.',
                'precio' => 7999.00,
                'stock' => 6,
                'imagen_url' => 'https://ddtech.mx/assets/uploads/ec1ff44ec336a75ebc30bf321610c2c8.png'
            ],
            [
                'nombre' => 'Procesador AMD Ryzen 5 8600G',
                'categoria' => 'Procesadores',
                'descripcion' => '6 núcleos con gráficos integrados potentes Radeon 760M, AM5.',
                'precio' => 3600.00,
                'stock' => 10,
                'imagen_url' => 'https://ddtech.mx/assets/uploads/99648e97cdaea9e12cd33cb795e2eac1.png'
            ],
            [
                'nombre' => 'Procesador Intel Core i3-12100F',
                'categoria' => 'Procesadores',
                'descripcion' => 'Excelente calidad-precio. 4 núcleos, 8 hilos, básico para gaming de entrada.',
                'precio' => 1550.00,
                'stock' => 20,
                'imagen_url' => 'https://neutronpcgamer.com/wp-content/uploads/2023/12/Procesador-Intel-Core-I3-12100f.png.webp'
            ],

            // === TARJETAS GRÁFICAS (6) ===
            [
                'nombre' => 'Tarjeta de Video NVIDIA RTX 4060 8GB',
                'categoria' => 'Tarjetas Gráficas',
                'descripcion' => 'Dual Fan, ideal para jugar a 1080p en Ultra con DLSS 3.0.',
                'precio' => 6200.00,
                'stock' => 10,
                'imagen_url' => 'https://m.media-amazon.com/images/I/71QvZTnJm+L.jpg'
            ],
            [
                'nombre' => 'Tarjeta de Video AMD Radeon RX 7600 XT 16GB',
                'categoria' => 'Tarjetas Gráficas',
                'descripcion' => 'Mucha VRAM para texturas pesadas a un precio contenido.',
                'precio' => 6899.00,
                'stock' => 7,
                'imagen_url' => 'https://ddtech.mx/assets/uploads/6628a84c7799da42b99779815e5d69e2.png'
            ],
            [
                'nombre' => 'Tarjeta de Video NVIDIA RTX 4070 Super 12GB',
                'categoria' => 'Tarjetas Gráficas',
                'descripcion' => 'Gama alta-media, perfecta para resoluciones 1440p competitivas.',
                'precio' => 12499.00,
                'stock' => 5,
                'imagen_url' => 'https://ddtech.mx/assets/uploads/b18915b6ba2e13208f7c6634a5a9d863.png'
            ],
            [
                'nombre' => 'Tarjeta de Video AMD Radeon RX 7800 XT 16GB',
                'categoria' => 'Tarjetas Gráficas',
                'descripcion' => 'Rendimiento bruto espectacular en rasterizado, compite con la gama alta.',
                'precio' => 10999.00,
                'stock' => 4,
                'imagen_url' => 'https://ddtech.mx/assets/uploads/af545cfa74fd3080e24844f8e325367f.png'
            ],
            [
                'nombre' => 'Tarjeta de Video NVIDIA RTX 4080 Super 16GB',
                'categoria' => 'Tarjetas Gráficas',
                'descripcion' => 'Para jugar a todo en 4K nativo sin despeinarse.',
                'precio' => 21500.00,
                'stock' => 3,
                'imagen_url' => 'https://ddtech.mx/assets/uploads/51ebf83a69768672512fbffe167e08f4.png'
            ],
            [
                'nombre' => 'Tarjeta de Video NVIDIA GTX 1650 4GB',
                'categoria' => 'Tarjetas Gráficas',
                'descripcion' => 'Un clásico de bajo consumo para actualizar equipos viejos de oficina.',
                'precio' => 2800.00,
                'stock' => 15,
                'imagen_url' => 'https://ddtech.mx/assets/uploads/e2a63f61ec704579cb188b4fcc127e06.jpg'
            ],

            // === LAPTOPS (6) ===
            [
                'nombre' => 'Laptop Gamer ASUS TUF Gaming A15',
                'categoria' => 'Laptops',
                'descripcion' => 'Ryzen 7, 16GB RAM, 512GB SSD, RTX 4050, Pantalla 144Hz.',
                'precio' => 17999.00,
                'stock' => 5,
                'imagen_url' => 'https://dlcdnwebimgs.asus.com/gain/7909b0a1-1457-4953-a9e7-41b2be78affa/w800'
            ],
            [
                'nombre' => 'Laptop Acer Nitro V15',
                'categoria' => 'Laptops',
                'descripcion' => 'Intel Core i5 13a Gen, 16GB RAM, 512GB SSD, RTX 4050, pantalla FHD.',
                'precio' => 15499.00,
                'stock' => 8,
                'imagen_url' => 'https://m.media-amazon.com/images/I/71F-Wcriq4L._AC_UF894,1000_QL80_.jpg'
            ],
            [
                'nombre' => 'Laptop HP Victus 16',
                'categoria' => 'Laptops',
                'descripcion' => 'Ryzen 5, 16GB RAM, 1TB SSD, RTX 4060. Gran diseño minimalista.',
                'precio' => 19800.00,
                'stock' => 4,
                'imagen_url' => 'https://m.media-amazon.com/images/I/61WGh6U2fXL._AC_UF894,1000_QL80_.jpg'
            ],
            [
                'nombre' => 'Laptop Lenovo Legion 5 Pro',
                'categoria' => 'Laptops',
                'descripcion' => 'Intel i7, 32GB DDR5, 1TB SSD, RTX 4070, Pantalla 2.5K 165Hz.',
                'precio' => 29999.00,
                'stock' => 3,
                'imagen_url' => 'https://p1-ofp.static.pub//fes/cms/2025/04/04/95ictst7gj332wfl11t7z3e8zfceti849742.png'
            ],
            [
                'nombre' => 'Laptop MacBook Air 13 M2',
                'categoria' => 'Laptops',
                'descripcion' => 'Chip M2, 8GB RAM unificada, 256GB SSD, Color Gris Espacial.',
                'precio' => 18499.00,
                'stock' => 6,
                'imagen_url' => 'https://content.macstore.mx/img/sku/CTOAPP1451_FZ.jpg'
            ],
            [
                'nombre' => 'Laptop de Oficina Dell Inspiron 3520',
                'categoria' => 'Laptops',
                'descripcion' => 'Intel i5 12a Gen, 8GB RAM, 512GB SSD, perfecta para estudiantes.',
                'precio' => 9500.00,
                'stock' => 12,
                'imagen_url' => 'https://m.media-amazon.com/images/I/71TYj5LbpgL.jpg'
            ],

            // === MEMORIAS RAM (6) ===
            [
                'nombre' => 'Memoria RAM Kingston Fury Beast 8GB DDR4',
                'categoria' => 'Memoria RAM',
                'descripcion' => 'Frecuencia de 3200MHz, ideal para actualizaciones económicas.',
                'precio' => 420.00,
                'stock' => 40,
                'imagen_url' => 'https://ddtech.mx/assets/uploads/f67446afb7d58485a78ec8cca31fc3c5.png'
            ],
            [
                'nombre' => 'Kit Memoria RAM Corsair Vengeance RGB Pro 16GB (2x8GB)',
                'categoria' => 'Memoria RAM',
                'descripcion' => 'DDR4 3600MHz, disipador de aluminio negro con luces RGB controlables.',
                'precio' => 1150.00,
                'stock' => 25,
                'imagen_url' => 'https://ddtech.mx/assets/uploads/cb1ba02b074c13d6ca5688aec76213e1.png'
            ],
            [
                'nombre' => 'Kit Memoria RAM XPG Spectrix D50 16GB (2x8GB)',
                'categoria' => 'Memoria RAM',
                'descripcion' => 'DDR4 3200MHz, diseño geométrico elegante color gris.',
                'precio' => 990.00,
                'stock' => 30,
                'imagen_url' => 'https://ddtech.mx/assets/uploads/50be6facdfdb6324622634c218adb4e0.jpg'
            ],
            [
                'nombre' => 'Kit Memoria RAM Kingston Fury Beast DDR5 32GB (2x16GB)',
                'categoria' => 'Memoria RAM',
                'descripcion' => 'Nueva generación DDR5 a 5600MHz, alta velocidad para AM5 e Intel 13/14a.',
                'precio' => 2100.00,
                'stock' => 15,
                'imagen_url' => 'https://ddtech.mx/assets/uploads/cbfe4789a8121f3a964add97199f8823.png'
            ],
            [
                'nombre' => 'Kit Memoria RAM Corsair Vengeance DDR5 32GB (2x16GB)',
                'categoria' => 'Memoria RAM',
                'descripcion' => '6000MHz CL36, optimizada para perfiles AMD EXPO e Intel XMP.',
                'precio' => 2450.00,
                'stock' => 10,
                'imagen_url' => 'https://ddtech.mx/assets/uploads/4d70d4e0d3bfd9e1ff75ff1924a090c0.png'
            ],
            [
                'nombre' => 'Memoria RAM para Laptop Crucial 16GB DDR4',
                'categoria' => 'Memoria RAM',
                'descripcion' => 'Formato SODIMM, 3200MHz, ideal para expandir la vida de tu laptop.',
                'precio' => 780.00,
                'stock' => 18,
                'imagen_url' => 'https://m.media-amazon.com/images/I/61q1ch0o2+L._AC_UF894,1000_QL80_.jpg'
            ],

            // === ALMACENAMIENTO (6) ===
            [
                'nombre' => 'SSD M.2 NVMe Kingston NV2 1TB',
                'categoria' => 'Almacenamiento',
                'descripcion' => 'PCIe 4.0 NVMe, velocidades de lectura de hasta 3500 MB/s.',
                'precio' => 1100.00,
                'stock' => 35,
                'imagen_url' => 'https://m.media-amazon.com/images/I/71NfMZKkpQL.jpg'
            ],
            [
                'nombre' => 'SSD M.2 NVMe Samsung 990 Pro 1TB',
                'categoria' => 'Almacenamiento',
                'descripcion' => 'Gama premium, velocidades extremas de hasta 7450 MB/s, ideal para PS5 y PC.',
                'precio' => 2190.00,
                'stock' => 14,
                'imagen_url' => 'https://i.blogs.es/d3ec54/dsc06716/650_1200.jpeg'
            ],
            [
                'nombre' => 'SSD M.2 NVMe Crucial P3 2TB',
                'categoria' => 'Almacenamiento',
                'descripcion' => 'PCIe 3.0, gran capacidad para almacenar tus videojuegos pesados.',
                'precio' => 1950.00,
                'stock' => 20,
                'imagen_url' => 'https://m.media-amazon.com/images/I/61RmWmtAdQL.jpg'
            ],
            [
                'nombre' => 'SSD SATA Adata SU650 480GB',
                'categoria' => 'Almacenamiento',
                'descripcion' => 'Formato 2.5 pulgadas, revive computadoras viejas cambiando el disco mecánico.',
                'precio' => 580.00,
                'stock' => 25,
                'imagen_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYb07k5Fh3EdbZ8WqreQzZt7Kd3WA2jXqL4pEyLK6LCrKaBwdpQBf_I1A&s=10'
            ],
            [
                'nombre' => 'Disco Duro Mecánico Seagate BarraCuda 2TB',
                'categoria' => 'Almacenamiento',
                'descripcion' => '3.5 pulgadas, 7200 RPM, ideal para almacenamiento masivo de archivos escolares.',
                'precio' => 1200.00,
                'stock' => 15,
                'imagen_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjhziAZvzOn7QBBFoVOvO0koYVOqo0Nr8DjU2eZ4o29Q&s=10'
            ],
            [
                'nombre' => 'Disco Duro Externo Adata HD710 Pro 1TB',
                'categoria' => 'Almacenamiento',
                'descripcion' => 'Uso rudo, resistente al agua y caídas, conexión rápida USB 3.1.',
                'precio' => 1150.00,
                'stock' => 10,
                'imagen_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxqDQEc0TciLXVTD7gHcbLClf88UqgqjHqtS_UjOvmYg&s=10'
            ],

            // === FUENTES DE PODER (6) ===
            [
                'nombre' => 'Fuente de Poder EVGA 600W W1',
                'categoria' => 'Fuentes de Poder',
                'descripcion' => 'Certificación 80 Plus White, ideal para configuraciones básicas de entrada.',
                'precio' => 950.00,
                'stock' => 15,
                'imagen_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSciTv7WEGD7oKz4jgV9D25xvM44VgHsemnrOS-bErWxw&s=10'
            ],
            [
                'nombre' => 'Fuente de Poder Corsair CX650M 650W',
                'categoria' => 'Fuentes de Poder',
                'descripcion' => 'Certificación 80 Plus Bronze, Semi-Modular, excelente protección eléctrica.',
                'precio' => 1450.00,
                'stock' => 12,
                'imagen_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7dUlFI4iaLbqklvB2uqq7x95Xn0nFDSoRFzD_vHsACw&s=10'
            ],
            [
                'nombre' => 'Fuente de Poder XPG Pylon 750W',
                'categoria' => 'Fuentes de Poder',
                'descripcion' => '80 Plus Bronze, cableado fijo premium, recomendada para gráficas tipo RTX 4060/4070.',
                'precio' => 1580.00,
                'stock' => 10,
                'imagen_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYhYTM1mR0txV3ti98jStgpybJTKjOTTFsvOrjPxL21A&s=10'
            ],
            [
                'nombre' => 'Fuente de Poder MSI MAG A850GL 850W',
                'categoria' => 'Fuentes de Poder',
                'descripcion' => '80 Plus Gold, Totalmente Modular, incluye cable nativo PCIe 5.0 ATX 3.0.',
                'precio' => 2250.00,
                'stock' => 8,
                'imagen_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSBfZhdbEtR0WP9q357gqmSWbiZ_IK4psw9M85e5pdmA&s=10'
            ],
            [
                'nombre' => 'Fuente de Poder ASUS ROG Strix 750W Gold',
                'categoria' => 'Fuentes de Poder',
                'descripcion' => 'Totalmente modular, disipadores ROG integrados, ventilador súper silencioso.',
                'precio' => 2800.00,
                'stock' => 6,
                'imagen_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaBPjgwHQgZ69JqNEap3a4M8YQYHEBGVo18gAKuvlPhA&s'
            ],
            [
                'nombre' => 'Fuente de Poder Gigabyte UD750GM 750W',
                'categoria' => 'Fuentes de Poder',
                'descripcion' => '80 Plus Gold, ultra duradera, diseño compacto modular.',
                'precio' => 1750.00,
                'stock' => 14,
                'imagen_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzjyEhbdL3kb5s1AZwrzk_gFi-2_HAlgMe6vKzqICb7g&s'
            ],

            // === GABINETES Y ENFRIAMIENTO (6) ===
            [
                'nombre' => 'Gabinete Balanx XPG con Vidrio Templado',
                'categoria' => 'Gabinetes',
                'descripcion' => 'Formato Mid-Tower, incluye 4 ventiladores ARGB instalados de fábrica.',
                'precio' => 1490.00,
                'stock' => 10,
                'imagen_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmfAY0US-WwNKUf2vBnbsUzHHUJe59QHcBmbt8n-5k7Q&s=10'
            ],
            [
                'nombre' => 'Gabinete Corsair 4000D Airflow Negro',
                'categoria' => 'Gabinetes',
                'descripcion' => 'Excelente flujo de aire con panel frontal de malla, manejo de cables impecable.',
                'precio' => 1850.00,
                'stock' => 8,
                'imagen_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTosaXv_z39py-rGuhT8dUmYBDe9G7FVMGEsYPcb2MHdA&s=10'
            ],
            [
                'nombre' => 'Gabinete Económico Acteck AC-929',
                'categoria' => 'Gabinetes',
                'descripcion' => 'Formato Micro-ATX, incluye una fuente básica de 500W para oficinas.',
                'precio' => 750.00,
                'stock' => 20,
                'imagen_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUfXDAduoGc5x9L6bnerIFyd5bxNFLv7YXCf56m3K_Tw&s=10'
            ],
            [
                'nombre' => 'Disipador por Aire DeepCool AK400 Digital',
                'categoria' => 'Gabinetes',
                'descripcion' => 'Torre de enfriamiento con pantalla digital que muestra la temperatura del CPU en vivo.',
                'precio' => 790.00,
                'stock' => 15,
                'imagen_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrkXZ9snMCjTLcAldC0DcsDOUd-sIj9_bnT1BCBrYpaQ&s=10'
            ],
            [
                'nombre' => 'Enfriamiento Líquido Cooler Master MasterLiquid 240L',
                'categoria' => 'Gabinetes',
                'descripcion' => 'Radiador de 240mm con dos ventiladores RGB, bomba mejorada contra fugas.',
                'precio' => 1650.00,
                'stock' => 6,
                'imagen_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNj6XScwXo5PIZglZezeVOqkCUacZA5QtQ_Q2_MXUBUQ&s=10'
            ],
            [
                'nombre' => 'Kit de 3 Ventiladores Eagle Warrior RGB',
                'categoria' => 'Gabinetes',
                'descripcion' => '120mm, incluye control remoto e interfaz de conexión tipo HUB.',
                'precio' => 380.00,
                'stock' => 30,
                'imagen_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT87bnFsIkTyPX2pG9wcr3zQA4ksvw0v1V5qw3vEZZszw&s=10'
            ],

            // === PERIFÉRICOS Y MONITORES (8) ===
            [
                'nombre' => 'Monitor Gamer ASUS TUF Gaming 24" 165Hz',
                'categoria' => 'Periféricos',
                'descripcion' => 'Panel IPS, 1ms de respuesta, compatible con FreeSync Premium.',
                'precio' => 2999.00,
                'stock' => 10,
                'imagen_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSewiRPjt4xCoRz_BYLGMCCWxPrcrVr4BNkuEG1kyYjww&s=10'
            ],
            [
                'nombre' => 'Teclado Mecánico Logitech G413 SE',
                'categoria' => 'Periféricos',
                'descripcion' => 'Teclas táctiles mecánicas, retroiluminación blanca, cubierta de aluminio.',
                'precio' => 1250.00,
                'stock' => 15,
                'imagen_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJMlcz7Apv8vYL56UrX-9ki_IvhCwD0nxCUAn8TuFs5A&s=10'
            ],
            [
                'nombre' => 'Mouse Gamer Logitech G502 Hero',
                'categoria' => 'Periféricos',
                'descripcion' => 'El mouse más vendido. Sensor 25K, pesas ajustables, 11 botones programables.',
                'precio' => 850.00,
                'stock' => 25,
                'imagen_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZgnqy2vYzbDbY9KvuLxRxHBpicii9miiAnHxGUhsk0w&s'
            ],
            [
                'nombre' => 'Audífonos HyperX Cloud Alpha Negros',
                'categoria' => 'Periféricos',
                'descripcion' => 'Estructura de aluminio, almohadillas cómodas de Memory Foam, micrófono desmontable.',
                'precio' => 1690.00,
                'stock' => 12,
                'imagen_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLaaObtZQ2-yUorJxuUesgmk3xbt69q1hgGKwX8V-LKg&s=10'
            ],
            [
                'nombre' => 'Mouse Pad Extra Grande Razer Goliathus',
                'categoria' => 'Periféricos',
                'descripcion' => '900x400mm, superficie optimizada para sensores láser u ópticos.',
                'precio' => 450.00,
                'stock' => 30,
                'imagen_url' => 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80'
            ],
            [
                'nombre' => 'Monitor Curvo Samsung Odyssey G3 27"',
                'categoria' => 'Periféricos',
                'descripcion' => 'FHD, 144Hz, diseño curvo inmersivo ideal para simuladores de carreras.',
                'precio' => 3899.00,
                'stock' => 6,
                'imagen_url' => 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80'
            ],
            [
                'nombre' => 'Combo Alambrico Logitech MK120',
                'categoria' => 'Periféricos',
                'descripcion' => 'Teclado y mouse básicos resistentes a salpicaduras para oficina.',
                'precio' => 290.00,
                'stock' => 40,
                'imagen_url' => 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80'
            ],
            [
                'nombre' => 'Cámara Web Logitech C920s Pro HD',
                'categoria' => 'Periféricos',
                'descripcion' => 'Resolución 1080p a 30fps, ideal para videollamadas de la universidad y stream.',
                'precio' => 1350.00,
                'stock' => 15,
                'imagen_url' => 'https://images.unsplash.com/photo-1600541519463-f90ab8880c85?w=600&auto=format&fit=crop&q=80'
            ],
        ];

        foreach ($productos as $item) {
            Producto::create($item);
        }
    }
}