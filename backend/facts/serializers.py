from rest_framework import serializers
from .models import Fact
from .models import CategoryOfFacts


class CategoryOfFactsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryOfFacts
        fields =('id', 'category_title',)


class FactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fact
        fields =('id', 'fact_title', 'fact_text', 'category')