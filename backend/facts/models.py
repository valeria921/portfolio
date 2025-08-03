from django.db import models

class CategoryOfFacts(models.Model):
    category_title = models.CharField(max_length=100)

    def __str__(self):
        return self.category_title


class Fact(models.Model):
    category = models.ForeignKey(
        CategoryOfFacts,
        on_delete=models.CASCADE,
        related_name='facts')
    fact_title = models.CharField(max_length=255)
    fact_text = models.TextField()

    def __str__(self):
        return self.fact_title
