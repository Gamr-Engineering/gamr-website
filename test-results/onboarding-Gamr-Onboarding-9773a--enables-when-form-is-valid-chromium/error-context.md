# Page snapshot

```yaml
- generic [ref=e2]:
  - region "Notifications (F8)":
    - list
  - region "Notifications alt+T"
  - generic [ref=e3]:
    - generic [ref=e5]:
      - link "Back" [ref=e6] [cursor=pointer]:
        - /url: /
        - img [ref=e7]
        - generic [ref=e9]: Back
      - generic [ref=e10]: Claim Your GamrTag
    - generic [ref=e15]:
      - generic [ref=e16]:
        - generic [ref=e17]:
          - generic [ref=e18]:
            - img [ref=e19]
            - text: Step 1 of 4
          - heading "Claim Your GamrTag" [level=1] [ref=e21]:
            - text: Claim Your
            - text: GamrTag
          - paragraph [ref=e22]: Your GamrTag is your unique identity across the GAMR ecosystem. Choose wisely — it's how the community will know you.
        - generic [ref=e23]:
          - generic [ref=e24]:
            - generic [ref=e25]: "@"
            - textbox "your-gamr-tag" [ref=e26]
          - generic [ref=e27]:
            - paragraph [ref=e28]: Min 3 characters. Letters, numbers, underscores only.
            - paragraph [ref=e29]: 0/20
      - generic [ref=e30]:
        - button "Continue" [disabled]:
          - text: Continue
          - img
```