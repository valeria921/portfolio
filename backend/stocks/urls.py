from django.urls import path
from .views import StockPredictionAPIView

urlpatterns = [
    # Prediction API
    path('predict/', StockPredictionAPIView.as_view(), name='stock_prediction'),
]

