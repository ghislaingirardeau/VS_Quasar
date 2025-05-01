Dans le dossier .github

Les fichiers permettent de configurer les Actions github à réaliser apres chaque Push

Ici, vitest et playwright pour les tests e2e

Avantage: pas besoin de laisser les tests ouvert en dev, github se charge de faire le test au push

On pourrait aussi configurer un build sur github action pour etre sur que tout ce passe correctement lors du build, mais Render le fait déjà pour nous !

A faire:

- si bug github action ne pas deployer sur render ! => distinguer 2 branches staging et prod et utiliser pull request pour le push sur prod
