from django.contrib import admin
from .models import Fact
from .models import CategoryOfFacts

class FactAdmin(admin.ModelAdmin):
    list_display = ('fact_title_short', 'category', 'fact_text_short')

    def fact_title_short(self, obj):
        return obj.fact_title[:40] + ("..." if len(obj.fact_title) > 40 else "")
    fact_title_short.short_description = 'Fact Title'

    def fact_text_short(self, obj):
            return obj.fact_text[:30] + ('...' if len(obj.fact_text) > 30 else '')
    fact_text_short.short_description = 'Preview'

    list_filter = ('category',)
    search_fields = ('fact_title', 'category__category_title')
    ordering = ('fact_title', 'category__category_title')

class CategoryOfFactsAdmin(admin.ModelAdmin):
    list_display = ('category_title',)
    list_filter = ('category_title',)

admin.site.register(Fact, FactAdmin)
admin.site.register(CategoryOfFacts, CategoryOfFactsAdmin)