
### git rebase

- https://juejin.cn/post/6974184935804534815#heading-9
- 提交记录更加清晰可读,少一次合并的commit
- 手动解决冲突，然后使用git add 、git rebase --continue的方式来处理冲突，完成 rebase
- 如果不想要某次 rebase 的结果，那么需要使用 git rebase --skip来跳过这次 rebase
- 把已经发生的多次提交压缩成一次提交 git rebase -i [hash]

**特别注意，只能在自己使用的 feature 分支上进行 rebase 操作，不允许在集成分支上进行 rebase，因为这种操作会修改集成分支的历史记录。**

### git cherry-pick
- git cherry-pick [hash] 可以理解为”挑拣”提交，只merge单个commit
- 有冲突 -> 解决 -> git cherry-pick --continue

[alias]
st = status -sb
co = checkout
br = branch
mg = merge
ci = commit
ds = diff --staged
dt = difftool
mt = mergetool
last = log -1 HEAD
latest = for-each-ref --sort=-committerdate --format=\"%(committername)@%(refname:short) [%(committerdate:short)] %(contents)\"
ls = log --pretty=format:\"%C(yellow)%h %C(blue)%ad %C(red)%d %C(reset)%s %C(green)[%cn]\" --decorate --date=short
hist = log --pretty=format:\"%C(yellow)%h %C(red)%d %C(reset)%s %C(green)[%an] %C(blue)%ad\" --topo-order --graph --date=short
type = cat-file -t
dump = cat-file -p
lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit


