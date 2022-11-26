# Autodeploy to EC2

```bash
docker login -u AWS -p $(aws ecr get-login-password --region us-east-1) 597884108175.dkr.ecr.us-east-1.amazonaws.com
```
```bash
docker run --rm 597884108175.dkr.ecr.us-east-1.amazonaws.com/simplejs:b537ff63300ac70a4aba9b940924b5c0325df669
```
