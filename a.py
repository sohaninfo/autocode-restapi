


f = None
for i in range(5):
	with open("x.txt", "w") as f:
		if (i > 2):
			break

print(f.closed)
