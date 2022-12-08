using System.Security.Cryptography;
using System.Text;

namespace Biblioteca_Backend.Utilidades
{
	public static class Encriptacion
	{
		public static string Encriptar(string? password)
		{
			SHA256 sha = SHA256.Create();
			ASCIIEncoding encoding = new();
			StringBuilder StringB = new();

			byte[] strem = sha.ComputeHash(encoding.GetBytes(password));
			for (int i = 0; i < strem.Length; i++) StringB.AppendFormat("{0:x2}", strem[i]);

			return StringB.ToString();
		}
	}
}
