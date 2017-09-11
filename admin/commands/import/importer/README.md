# Importing data from the old dump

## Dump format

`Username|Timestamp|Email|URL|Message|[EOM]`
`Luigi|1154347233|||Kedves Csizi!<br><br>Kérdésem az lenne hogy szerinted mit kéne tenni, hogy a Robát leverjem rövidebb távokon?|[EOM]`

Where the `Email` and `Url` fields might not exist. In this case

`Username|Timestamp|Message|[EOM]`
`Dingo|1209017777|Hááát ez csábító, lehet maradok. itthon....Egyedül....|[EOM]`
`|1265311392|<p>2010-re megokosodok?</p>|[EOM]`

Note: Username is missing for the last ~260 messages.

## Imported structure

```
username: ?string
timestamp: number
email?: ?string
url?: ?url
message: string
```

## Exported (Entry) structure

```
{
  authorId: string,
  publishTime: {
    timestamp: number,
    timezone: string
  },
  message: Array<BlockNode>
}
```
