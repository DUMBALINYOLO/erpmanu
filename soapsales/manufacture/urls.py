from rest_framework.routers import DefaultRouter

from manufacture.apis import (
                    ProcessMachineViewset,
                    ProcessMachineGroupViewset,
                    UnverifiedProductionProcessViewSet,
                    VerifiedProductionProcessViewSet,
                    ProductionOrderViewSet,
                    ProcessRateViewSet,
                    ProcessProductViewSet,
                    WasteGenerationReportViewSet,
                    ManufucturingPersonelViewSet,
                    ManufucturingTeamViewSet,
                    ShiftViewSet,
                    ShiftScheduleViewSet,
                    ProcessedProductsStockReceiptViewSet,
                    ProcessedProductsStockTakeViewSet,
                    ProcessedProductStockAdjustmentViewSet,
                    ManufacturedStockItemViewSet,
                    ProductionProcessViewSet


                )


router = DefaultRouter()
##start =
router.register(r'unverified-production-processes', UnverifiedProductionProcessViewSet, basename='unverified-production-processes')
router.register(r'verified-production-processes', VerifiedProductionProcessViewSet, basename='unverified-production-processes')
router.register(r'manufactured-stock-items',  ManufacturedStockItemViewSet, basename='manufactured-stock-items')
router.register(r'production-processes',  ProductionProcessViewSet, basename='production-processes')
#end

router.register(r'process-machines', ProcessMachineViewset, basename='process-machines')
router.register(r'process-machine-groups', ProcessMachineGroupViewset, basename='process-machine-groups')

router.register(r'shifts', ShiftViewSet, basename='shifts')
router.register(r'shift-schedules', ShiftScheduleViewSet, basename='shift-schedules')
router.register(r'process-rates', ProcessRateViewSet, basename='process-rates')
router.register(r'production-orders', ProductionOrderViewSet, basename='production-orders')
router.register(r'manufacturing-teams', ManufucturingTeamViewSet, basename='manufacturing-teams')
router.register(r'manufacturing-personels', ManufucturingPersonelViewSet, basename='manufacturing-personels')
router.register(r'process-products', ProcessProductViewSet, basename='process-products')
router.register(r'waste-generation-reports', WasteGenerationReportViewSet, basename='waste-generation-reports')
router.register(r'processed-product-stock-receipts', ProcessedProductsStockReceiptViewSet, basename='processed-product-stock-receipts')
router.register(r'processed-product-stock-adjustments', ProcessedProductStockAdjustmentViewSet, basename='processed-product-stock-adjustments')
router.register(r'processed-product-stock-takes', ProcessedProductsStockTakeViewSet, basename='processed-product-stock-takes')



urlpatterns = router.urls
