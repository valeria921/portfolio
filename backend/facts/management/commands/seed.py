import os
from django.core.management.base import BaseCommand
from ...models import CategoryOfFacts, Fact
from django.conf import settings

class Command(BaseCommand):
    help = 'Seed the database with facts from a txt file'

    def handle(self, *args, **kwargs):
        file_path = os.path.join(settings.BASE_DIR, 'facts.txt')

        if not os.path.exists(file_path):
            self.stdout.write(self.style.ERROR('facts.txt not found!'))
            return

        with open(file_path, 'r', encoding='utf-8') as file:
            for line in file:
                if not line.strip():
                    continue  # skip empty lines

                try:
                    category_name, fact_title, fact_text = line.strip().split('|')
                    category, _ = CategoryOfFacts.objects.get_or_create(category_title=category_name.strip())
                    Fact.objects.get_or_create(
                        fact_title=fact_title.strip(),
                        fact_text=fact_text.strip(),
                        category=category
                    )
                    self.stdout.write(self.style.SUCCESS(f"Added fact: {fact_title}"))
                except ValueError:
                    self.stdout.write(self.style.ERROR(f"Invalid line format: {line.strip()}"))
