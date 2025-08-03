from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CategoryOfFacts, Fact
from .serializers import CategoryOfFactsSerializer, FactSerializer
import random


class CategoryListAPIView(APIView):
    def get(self, request):
        categories = CategoryOfFacts.objects.all()
        serializer = CategoryOfFactsSerializer(categories, many=True)
        return Response(serializer.data)


class RandomFactByCategoryAPIView(APIView):
    def get(self, request, category_id):
        try:
            category = CategoryOfFacts.objects.get(id=category_id)
        except CategoryOfFacts.DoesNotExist:
            return Response({"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND)

        facts = Fact.objects.filter(category=category)
        if not facts.exists():
            return Response({"message": "No facts in this category"}, status=status.HTTP_404_NOT_FOUND)

        random_fact = random.choice(facts)
        serializer = FactSerializer(random_fact)
        return Response(serializer.data)
