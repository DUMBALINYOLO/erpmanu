from rest_framework import routers
from inventory.apis import (
                    InventorySettingsViewset,
                    CategoryViewset,
                    DebitNoteViewSet,
                    OrderViewSet,
                    OrderPaymentViewSet,
                    RawMaterialsViewSet,
                    EquipmentViewSet,
                    ConsumablesViewSet,
                    ActiveSupplierViewSet,
                    DeActivedSupplierViewSet,
                    WareHouseViewSet,
                    InventoryStockItemViewSet,
                    StorageMediaViewSet,
                    OrderItemViewSet,
                    StockReceiptViewSet,
                    StockAdjustmentViewSet,
                    InventoryStockTakeViewSet,
                    FullyReceivedAndTotalPaidForOrderViewSet,
                    FullyReceivedTotalPaidForAndVerifiedOrderViewSet,
                    SupplierAddressViewSet,
                    InventoryItemViewSet,
                )

router = routers.DefaultRouter()

router.register(r'config', InventorySettingsViewset, basename='inventory-config')
router.register(r'inventory-categories', CategoryViewset, basename='inventory-categories' )
router.register(r'debit-notes',  DebitNoteViewSet, basename='debit-notes')
router.register(r'inventory-orders',  OrderViewSet, basename='invetory-orders')
router.register(r'inventory-items',  InventoryItemViewSet, basename='inventory-items')
router.register(r'inventory-orderpayments',  OrderPaymentViewSet, basename='inventory-orderpayments')

router.register(r'warehouses',  WareHouseViewSet, basename='warehouses')
router.register(r'inventorystockitems',  InventoryStockItemViewSet, basename='inventorystockitems')
router.register(r'storagemedias',  StorageMediaViewSet, basename='storagemedias')
router.register(r'orderitems',  OrderItemViewSet, basename='orderitems')
router.register(r'inventoryreceipts',  StockReceiptViewSet, basename='inventoryreceipts')
router.register(r'stockadjustments',  StockAdjustmentViewSet, basename='stockadjustments')
router.register(r'inventorystocktakes', InventoryStockTakeViewSet, basename='inventorystocktakes' )
#take from here
router.register(r'active-suppliers',  ActiveSupplierViewSet, basename='active-suppliers')
router.register(r'de-actived-suppliers',  DeActivedSupplierViewSet, basename='de-actived-suppliers')
router.register(r'supplier-addresses',  SupplierAddressViewSet, basename='supplier-addresses')
router.register(r'raw-materials',  RawMaterialsViewSet, basename='raw-materials')
router.register(r'equipments',  EquipmentViewSet, basename='equipments')
router.register(r'consumables',  ConsumablesViewSet, basename='consumables')
router.register(r'fully-received-and-total-paid-for-orders',  FullyReceivedAndTotalPaidForOrderViewSet, basename='fully-received-and-total-paid-for-orders')
router.register(r'fully-received-total-paid-for-and-verified-orders',  FullyReceivedTotalPaidForAndVerifiedOrderViewSet, basename='fully-received-total-paid-for-and-verified-orders')




urlpatterns = router.urls
