# Mitt Helsingborg IO - AWS LAMBDA TEST

## Requirements
- AWS Account
- AWS IAM User
- Python with PIP

## Setup
# Homebrew on macOS
```
brew install awscli
```

# Using Pip on Linux, macOS or Unix by running:
```
sudo pip install awscli
```

# Set up the Serverless Framework
Install Serverless globally.
```
npm install serverless -g
```

# Lambda app
```
git clone https://github.com/helsingborg/mitt-helsingborg-io-lambda
cd mitt-helsingborg-io-lambda
npm install
```

# Add your access key to AWS CLI
It should look something like this:
* Access key ID AKIAIOSFODNN7EXAMPLE
* Secret access key wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

Simply run the following with your Secret Key ID and your Access Key
```
aws configure
```

## Test local - get
```
serverless invoke local --function get
```

## Deploy
```
serverless deploy
```

## API endpoint
```
https://d02r1sf4gh.execute-api.eu-west-1.amazonaws.com/dev/api/v1
```
May be different when you do.