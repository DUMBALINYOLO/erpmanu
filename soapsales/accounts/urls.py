from rest_framework import routers
from django.urls import path

from accounts.apis import (
                    AccountViewSet,
                    InActiveAccountViewSet,
                    AssetViewSet,
                    AccountingSettingsViewset,
                    TaxViewset,
                    CurrencyViewset,
                    BillViewset,
                    BillPaymentViewset,
                    InterestBearingAccountViewSet,
                    UnPostedandUnAdjustedJournalEntryViewSet,
                    UnAdjustedJournalEntryViewSet,
                    UnPostedJournalEntryViewSet,
                    PostedJournalEntryViewSet,
                    LedgerViewSet,
                    PostViewSet,
                    WorkBookViewSet,
                    AdjustmentViewSet,
                    DebitViewSet,
                    CreditViewSet,
                    TrialBalanceAPIView,
                    ProfitAndLossReportAPIView,
                    JournalReportAPIView,
                    BalanceSheetAPIView,
                    AccountReportAPIView,
                    FullyPaidButNotVerifiedBillViewset,
                    FullyPaidBillViewset,
                    JournalViewSet,

                )

router = routers.DefaultRouter()



router.register(r'accounts', AccountViewSet, basename='active-accounts')
#new take me sir
router.register(r'interest-bearing-accounts', InterestBearingAccountViewSet, basename='interest-bearing-accounts')
router.register(r'journals', JournalViewSet, basename='journals')
router.register(r'ledgers', LedgerViewSet, basename='ledgers')
router.register(r'accounting-posts', PostViewSet, basename='accounting-posts')
router.register(r'workbooks', WorkBookViewSet, basename='workbooks')
router.register(r'accounting-adjustments', AdjustmentViewSet, basename='accounting-adjustments')
router.register(r'debits', DebitViewSet, basename='debits')
router.register(r'credits', CreditViewSet, basename='credits')
router.register(r'fully-paid-not-verified-bills', FullyPaidButNotVerifiedBillViewset, basename='fully-paid-not-verified-bills')
router.register(r'fully-paid-bills', FullyPaidBillViewset, basename='fully-paid-bills')
router.register(r'unposted-and-unadjusted-journal-entries', UnPostedandUnAdjustedJournalEntryViewSet, basename='unposted-and-unadjusted-journal-entries')
router.register(r'unadjusted-journal-entries', UnAdjustedJournalEntryViewSet, basename='unadjusted-journal-entries')
router.register(r'unposted-journal-entries', UnPostedJournalEntryViewSet, basename='unposted-journal-entries')
router.register(r'posted-journal-entries', PostedJournalEntryViewSet, basename='posted-journal-entries')
#the end 
# router.register(r'journal-entries', JournalEntryViewSet)
router.register(r'in-active-accounts', InActiveAccountViewSet, basename='inactive-accounts')
router.register(r'assets', AssetViewSet, basename='assets')
router.register(r'accounting-configuration', AccountingSettingsViewset, basename='config')
router.register(r'taxes', TaxViewset, basename='taxes')
router.register(r'currencies', CurrencyViewset, basename='currencies')
router.register(r'bills', BillViewset, basename='bills')
router.register(r'bill-payments', BillPaymentViewset, basename='bills')


urlpatterns = [
     path('trial-balance-reports', TrialBalanceAPIView.as_view()),
     path('balance-sheets-reports', BalanceSheetAPIView.as_view()),
     path('profit-and-loss-reports', ProfitAndLossReportAPIView.as_view()),
     path('journal-reports', JournalReportAPIView.as_view()),
     path('accounts-movements-reports', AccountReportAPIView.as_view()),

] + router.urls



