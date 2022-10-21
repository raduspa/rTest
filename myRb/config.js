module.exports = {
  platform: 'github',
  onboardingConfig: {
    extends: ['config:base'],
  },
  repositories: ['raduspa/rTest'],
  requireConfig: "optional",
  onboarding: false,  
  logLevel: 'debug',
  recreateClosed: true,
  dependencyDashboard: true,
  
  extends: ["config:base",
    "group:allNonMajor",
    ":preserveSemverRanges"
  ],
  lockFileMaintenance: {
    "enabled": true
  },
  baseBranches: [
    "main"
  ],
  ignorePaths: [
    "**/node_modules/**",
    "**/test/**",
    "**/tests/**"
  ],
  packageRules: [
    {
      "description": "explicitly enable npm",
      "matchManagers": [
        "npm"
      ],
      "matchPackagePatterns": [
        "*"
      ],
      "matchCurrentVersion": "!/.*-.*/",
      "enabled": true
    },
    {
      "description": "Pin typescript for angular 12",
      "matchPackageNames": ["typescript"],
      "allowedVersions": "<=4.3.5"
    },
    {
      "description": "Pin angular 12",
      "matchPackagePatterns": ["angular"],
      "allowedVersions": "<13"
    },
    {
      "description": "first disable all the default maven updates",
      "matchManagers": [
        "gradle"
      ],
      "enabled": false
    },
    {
      "description": "explicitly enable maven",
      "matchManagers": [
        "gradle"
      ],
      "matchPackagePatterns": [
        "^org.kuali."
      ],
      "enabled": true
    },
    {
      "description": "Disable for global.json",
      "matchFiles": [
        "global.json"
      ],
      "enabled": false
    }
  ]
};
