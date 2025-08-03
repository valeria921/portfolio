from django.urls import path
from .views import CategoryListAPIView, RandomFactByCategoryAPIView

urlpatterns = [
    path('categories/', CategoryListAPIView.as_view(), name='category-list'),
    path('categories/<int:category_id>/random_fact/', RandomFactByCategoryAPIView.as_view(), name='random-fact-by-category'),
]
